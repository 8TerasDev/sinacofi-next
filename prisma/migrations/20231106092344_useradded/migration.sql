
CREATE TABLE "empleado" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT,
    "telefono" TEXT,
    "codigo_banco" TEXT,
    "url_profile" TEXT,
    "creation_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "empleado_pkey" PRIMARY KEY ("id")
);
