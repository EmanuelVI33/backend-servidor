import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import axios from 'axios';
// const openai = new OpenAI();
// openai.apiKey = process.env.OPENAI_API_KEY;
@Injectable()
export class ChatgptService {
    constructor(
    ) {
    }
    private conversationState = [];

    async getCompletion(prompt: any) {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [...this.conversationState,
                { role: 'system', content: 'You are a useful assistant who knows about songs, your answers will be solely and exclusively the title of the requested music, I dont want you to give me the author.' },
                { role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
                },
            }
        );

        // console.log(`respuesta : ${JSON.stringify(response.data.error)}`);

        if (response.status === 200) {
            const data = response.data;
            if (data.choices && data.choices.length > 0) {
                const chatGPTText = data.choices[0].message.content;
                console.log('Respuesta de ChatGPT:', chatGPTText);
                return chatGPTText;
            } else {
                console.error('La respuesta de ChatGPT no tiene las propiedades esperadas.');
                return null;
            }
        } else {
            console.error('Error al obtener la respuesta de ChatGPT:', response.statusText);
            return null;
        }
    }
}
