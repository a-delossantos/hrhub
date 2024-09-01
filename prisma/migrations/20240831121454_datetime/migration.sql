-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ProjectMaterial" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
