export async function chatWithGPT(data) {
    let key = getSettings().key;
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
    let response = await fetch("https://api.openai.com/v1/chat/completions", options);
    let json = await response.json();
    return json.choices[0].message.content;
}