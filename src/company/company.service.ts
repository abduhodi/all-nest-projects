import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyRepo: typeof Company,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.companyRepo.create(createCompanyDto);
    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepo.findAll({ include: { all: true } });
  }

  async getCompanyById(id: string): Promise<Company> {
    return this.companyRepo.findByPk(id, { include: { all: true } });
  }

  async deleteCompany(id: number): Promise<Number> {
    return this.companyRepo.destroy({ where: { id } });
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0].dataValues;
  }
}
