import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
    constructor(private readonly chatgptService: ChatgptService) { }

    @Post()
    async hacerSolicitud(@Body() data: any): Promise<any> {
        try {
            const interpretacion = await this.chatgptService.getCompletion(data.text);
            return interpretacion;
        } catch (error) {
            console.error('Error al generar la petición:', error);
            throw new InternalServerErrorException('Error al generar la petición');
        }
    }

    // @Post('interaction')
    // async hacerInteraccion(@Body() data : any) : Promise<any>{
    //     try {
    //         const res = await this.chatgptService.postInteraccion(data.text);
    //         return
    //     } catch (error) {
            
    //     }
    // }
}
