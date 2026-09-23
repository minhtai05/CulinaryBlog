import { BadRequestException, Controller, Delete, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStorageService, UploadFile } from './file-storage.service';

@Controller('media')
export class MediaController {
  constructor(private readonly fileStorage: FileStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  upload(@UploadedFile() file?: UploadFile) {
    if (!file) throw new BadRequestException({ type: 'VALIDATION_ERROR', detail: 'A file is required.' });
    return this.fileStorage.uploadAsync(file, 'uploads');
  }

  @Delete('upload')
  delete(@Query('key') key?: string) {
    if (!key) throw new BadRequestException({ type: 'VALIDATION_ERROR', detail: 'A file key is required.' });
    return this.fileStorage.deleteAsync(key);
  }
}
