-- CreateTable
CREATE TABLE "empleado" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "empresa_id" INTEGER NOT NULL,

    CONSTRAINT "empleado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "declaracion" (
    "id" SERIAL NOT NULL,
    "folio" TEXT NOT NULL,
    "fecha_declaracion" TIMESTAMP(3) NOT NULL,
    "fecha_carga_declaracion" TIMESTAMP(3) NOT NULL,
    "empresa_id" INTEGER NOT NULL,

    CONSTRAINT "declaracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiarios_finales" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "rut_identificacion" TEXT NOT NULL,
    "participacion" TEXT NOT NULL,
    "declaracion_id" INTEGER NOT NULL,

    CONSTRAINT "beneficiarios_finales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "control_efectivo" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "rut_identificacion" TEXT NOT NULL,
    "participacion" TEXT NOT NULL,
    "declaracion_id" INTEGER NOT NULL,

    CONSTRAINT "control_efectivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persona_juridica" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    "comuna" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "constitucion" TIMESTAMP(3) NOT NULL,
    "telefono" TEXT NOT NULL,
    "tipo_sociedad" TEXT NOT NULL,
    "declaracion_id" INTEGER NOT NULL,

    CONSTRAINT "persona_juridica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "representante_legal" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "persona_juridica_id" INTEGER NOT NULL,

    CONSTRAINT "representante_legal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persona_juridica_declaracion_id_key" ON "persona_juridica"("declaracion_id");

-- AddForeignKey
ALTER TABLE "empleado" ADD CONSTRAINT "empleado_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "declaracion" ADD CONSTRAINT "declaracion_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiarios_finales" ADD CONSTRAINT "beneficiarios_finales_declaracion_id_fkey" FOREIGN KEY ("declaracion_id") REFERENCES "declaracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "control_efectivo" ADD CONSTRAINT "control_efectivo_declaracion_id_fkey" FOREIGN KEY ("declaracion_id") REFERENCES "declaracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persona_juridica" ADD CONSTRAINT "persona_juridica_declaracion_id_fkey" FOREIGN KEY ("declaracion_id") REFERENCES "declaracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "representante_legal" ADD CONSTRAINT "representante_legal_persona_juridica_id_fkey" FOREIGN KEY ("persona_juridica_id") REFERENCES "persona_juridica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
