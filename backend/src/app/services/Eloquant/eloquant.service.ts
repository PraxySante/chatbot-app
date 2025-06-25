// import de la library jose
import * as jose from "jose";

/**
 * Methode qui transforme les informations d'indentification sous forme d'un JWT à transmettre au backend en JWE
 *
 * @param claims les informations d'indentification sous forme d'un JWT à transmettre au backend
 * @returns le JWE
 */
export async function getJWE(claims: any) {
  console.log("🚀 ~ getJWE ~ claims:", claims)
  try {
    const keys = await loadLocalKeys();
    // méthode à ne pas copier pour la prod
    await exportPublicJWK(keys.publicKey);
    const jws = await signJWT(claims, keys.privateKey);
    console.log("🚀 ~ getJWE ~ jws:", jws)
    const acdKey = await loadAcdPublicKey();
    return await encryptJWE(jws, acdKey);
  } catch (error) {
    console.error(error)
  }

}
/**
 * Récupération des clés publiques et privées
 */
async function loadLocalKeys() {
	const ecPublicKey = await jose.importSPKI(
		String(process.env.PUBLIC_KEY),
		String(process.env.JWK_ALG),
		{ extractable: true }
	);
	const ecPrivateKey = await jose.importPKCS8(
		String(process.env.PRIVATE_KEY),
		String(process.env.JWK_ALG)
	);
	return {
		publicKey: ecPublicKey,
		privateKey: ecPrivateKey,
	};
}
/**
 * <b>ATTENTION ne pas copier pour la prod</b>
 * Permet d'afficher la clé publique dans les logs pour pouvoir la mettre dans la configuration de l'acd
 */
export async function exportPublicJWK(publicKey:any) {
	const publicJwk = await jose.exportJWK(publicKey);
	console.log("publicJwk=\n" + JSON.stringify(publicJwk));
}
/**
 * Signe le JWT et retourne le JWS
 *
 * @param claims les informations d'indentification sous forme d'un JWT à transmettre au backend
 * @param privateKey votre clé privée
 * @returns le JWS
 */
async function signJWT(claims:any, privateKey:any) {
	// ajout de la date d'expiration (date de maintenant + 1 minute)
	claims.exp = Date.now() + 60 * 1000;
	const jws = await new jose.CompactSign(
		new TextEncoder().encode(JSON.stringify(claims))
	)
  .setProtectedHeader({ alg: String(process.env.JWK_ALG) })
  .sign(privateKey);
  console.log("🚀 ~ signJWT ~ jws:", jws)
	return jws;
}

/**
 * Récupération de la clé publique de l'acd
 */
async function loadAcdPublicKey() {
	return await jose.importJWK({
    "kty": "RSA",
    "e": "AQAB",
    "n":"rikDo8KryrnChgKMszTMk3BYlaxNcbbEmkUzDVtkTvVvs8SsHajT3CWM8863T4Q0NyzLfkziKTMWmqFZ-xEjFHkleBpNmDe8PtzIv87UYgjgBTtCJ048kIasZSWy8DQUlKLVKtxPzQqaNbxBBjPsFQjsAzjLRlQpbnnUBUnuWk6WqKrc1Af0P3ItzCWIWuFeYoctid4pKrxRhZ4X5Jye-X1nrTLPLWsyRmkfiY26VuTFEXqz60kEkV0t7vZK3ldSr2N4hrWO0oJx2R7AlGMYCW3YkSr1NkCTSD-4eFHR9uflNHtH6wmFn-qhbQ8lVNJIQv7q7ErvshD0StsHSSbpTw"
    }, process.env.JWE_ALG);
}
/**
 * Chiffre le JWS et retourne un JWE
 *
 * @param jws le JWS à chiffrer
 * @param acdPublicKey la clé public de l'acd
 * @returns le JWE
 */
async function encryptJWE(jws:any, acdPublicKey:any) {
	const jwe = await new jose.CompactEncrypt(new TextEncoder().encode(jws))
		.setProtectedHeader({
			alg: String(process.env.JWE_ALG),
			enc: String(process.env.JWE_ENCRYPTION),
			cty: "JWT",
		})
		.encrypt(acdPublicKey);
	return jwe;
}
