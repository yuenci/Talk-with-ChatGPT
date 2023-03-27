import configs from "./config.json";


export async function chatWithGPT(data) {
    let prompt = [
        {
            role: 'system',
            content: "You are a helpful assistant."
        }
    ]

    // add datas to the end of prompt array

    let messages = prompt.concat(data);
    // console.log(messages);


    let key = configs.OPENAI_API_KEY;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": messages
        })
    }
    console.log(options);
    let response = await fetch("https://api.openai.com/v1/chat/completions", options);
    let json = await response.json();
    console.log(json);
    return json.choices[0].message.content;
}

export async function speechS(text) {
    const SPEECH_REGION = configs.serviceRegion;
    const SPEECH_KEY = configs.subscriptionKey;

    const url = `https://${SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const data = `<speak version='1.0' xml:lang='en-US'>
                        <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
                            ${text}
                        </voice>
                        </speak>`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": SPEECH_KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
            "User-Agent": "curl"
        },
        body: data
    };

    let response = await fetch(url, requestOptions)
    let bufferData = await response.arrayBuffer();
    const blob = new Blob([bufferData], { type: "audio/mp3" });
    return window.URL.createObjectURL(blob)
}