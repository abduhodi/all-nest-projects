import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from '../guards/jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Comment')
@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'post new comment' })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'get all comments' })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'get comment by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @ApiOperation({ summary: 'update comment' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'delete comment' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @ApiOperation({ summary: 'hit like to the comment' })
  @Get('like/:id')
  likeComment(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.commentService.likeComment(id, req);
  }
}
