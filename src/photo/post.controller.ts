import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { PostService } from './post.service';
import { CreatePostDto, File } from './dto/post.dto';
import { Posts } from './models/post.model';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'create new post' })
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: Request,
    @UploadedFiles() files: File[],
  ): Promise<Posts> {
    return this.postService.create(createPostDto, req, files);
  }

  @ApiOperation({ summary: 'get all posts' })
  @Get()
  async findAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: 'get post by id' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postService.findOne(id);
  }

  // @ApiOperation({ summary: 'update post' })
  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updatePostDto: UpdatePost,
  // ): Promise<Photo> {
  //   return this.photoService.update(id, updatePhotoDto);
  // }

  @ApiOperation({ summary: 'delete post' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.postService.remove(id);
  }

  @ApiOperation({ summary: 'like photo' })
  @Get('like/:id')
  async likePhoto(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.postService.likePost(id, req);
  }
}
