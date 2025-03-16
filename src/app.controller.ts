import { Controller, Post, UploadedFile, UseInterceptors, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as pdfParse from 'pdf-parse';

@Controller()
export class ResumeController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @Body('jobText') jobText: string
  ) {
    if (!file || !file.buffer) {
      throw new HttpException('File not provided or invalid', HttpStatus.BAD_REQUEST);
    }

    try {
      // Parse the file buffer using pdf-parse
      const data = await pdfParse(file.buffer);
      const resumeText = data.text;
      
      // Call the Python API with the resumeText and jobText
      const pythonResponse = await fetch(`${process.env.PYTHON_API_URL}/analyze-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeText,
          job_text: jobText,
        }),
      });
      
      if (!pythonResponse.ok) {
        throw new Error(`Python API error: ${pythonResponse.statusText}`);
      }
      
      const analysisResult = await pythonResponse.json();
      return analysisResult;
    } catch (error) {
      throw new HttpException('Error processing resume: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
