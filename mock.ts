import {
  randText,
  randFullName,
  randStreetAddress,
  randCity,
  randCountry,
  randNumber,
  randCompanyName,
} from "@ngneat/falso";

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomString(length: number): string {
  let result = "";
  while (result.length < length) {
    result += randText({ charCount: length - result.length });
  }
  return result.substring(0, length);
}

function randomBigInt(): BigInt {
  // Genera un número aleatorio y conviértelo en un string
  const randomNumberString = randNumber({
    min: 1000000000,
    max: 9999999999,
  }).toString();

  // Convierte el string en BigInt
  return BigInt(randomNumberString);
}

function generateBfDataProcessDeclaraciones() {
  return {
    id: randomBigInt(),
    codigo_banco: randomString(4),
    correlativo: randomString(64),
    status: randomString(64),
    fecha_subida: randomDate(new Date(2020, 0, 1), new Date()),
    num_declaracion: randomString(64),
    fecha_declaracion: randomDate(new Date(2020, 0, 1), new Date()),
    bank_id: randomBigInt(),
    // personas_juridicas: se generarán aparte y se vincularán
  };
}
function generateBfDataProcessBeneficiariosFinales(declaracionId: BigInt) {
  return {
    id: randomBigInt(),
    tipo: randomString(2),
    identificacion: randomString(9),
    nombre_completo: randFullName(),
    domicilio: randStreetAddress(),
    ciudad: randCity(),
    pais: randCountry(),
    participacion: randomString(5),
    created_at: randomDate(new Date(2020, 0, 1), new Date()),
    declaracion_id: declaracionId,
  };
}

function generateBfDataProcessBank() {
  return {
    id: randomBigInt(),
    nombre: randCompanyName(),
    codigo: randomString(4),
    created_at: randomDate(new Date(2020, 0, 1), new Date()),
    // accounts_user: se generarán aparte y se vincularán
  };
}

async function main() {
  const bank = generateBfDataProcessBank();
  const declaracion = generateBfDataProcessDeclaraciones();
  declaracion.bank_id = bank.id;
  const BfDataProcessBeneficiariosFinales =
    generateBfDataProcessBeneficiariosFinales(declaracion.id);

  console.log({ declaracion, bank, BfDataProcessBeneficiariosFinales });
}

main();
