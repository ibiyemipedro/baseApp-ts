import { User } from "./../entities/user.entity";
import { Company } from "./../entities/company.entity";
import { getRepository } from "typeorm";
import HttpException from "../utils/httpException";
import { ICompany } from "../interfaces/dto/ICompany";

class CompanyService {
  async create(
    company,
    owner: User | null = null,
    ownerId: number
  ): Promise<ICompany | Error> {
    try {
      const existingCompany = await getRepository(Company).findOne({
        where: [
          { email: company.email },
          { mobileNumber: company.mobileNumber },
        ],
      });

      if (existingCompany) {
        return new HttpException(
          400,
          "Company email or mobile number already used",
          "create company service"
        );
      }
      if (owner) {
        company.owner = owner;
      }

      if (ownerId) {
        const owner = await getRepository(User).findOne({ id: ownerId });
        if (owner) {
          company.owner = owner;
        }
      }

      if (!company.owner) {
        return new HttpException(
          400,
          "User not valid to create company",
          "create company service"
        );
      }

      const createdCompany = await getRepository(Company).save(company);

      return createdCompany;
    } catch (error) {
      error.source = "Create Company Service";
      throw error;
    }
  }

  async get(companyId: number): Promise<ICompany | Error> {
    try {
      const company = await getRepository(Company).findOne({
        where: { id: companyId },
      });

      if (!company) {
        return new HttpException(
          400,
          "Company not found",
          "get company service"
        );
      }
      return company;
    } catch (error) {
      error.source = "Create Company Service";
      throw error;
    }
  }
}

export default CompanyService;
