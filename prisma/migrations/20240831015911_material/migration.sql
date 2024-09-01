-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_material_id_key" ON "Material"("material_id");
