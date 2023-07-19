import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get('all')
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string): Promise<Company> {
    return this.companyService.getCompanyById(id);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string): Promise<Number> {
    return this.companyService.deleteCompany(+id);
  }

  @Put('update/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
}
