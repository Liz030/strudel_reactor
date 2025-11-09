export function Preprocess({ inputText, volume, cpm, instruments }) {

    let outputText = inputText;
    outputText += `\n//all(x => x.gain(${volume}))`

    outputText += `\nsetcps(${cpm}/60/4)`

    outputText += `\n //text is checked: ${instruments.map((items) => items.name)}`

    //mute checkboxes for instruments

    for (let i = 0; i < instruments.length; i++) {
        outputText = outputText.replaceAll(instruments[i].replace, instruments[i].value)   
    }

   

    
   
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    outputText = outputText.replaceAll("{$CPM}", cpm)


   

    let regex = /[a-zA-Z0-9_]+:*\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;
    let m;
    let matches = []
    
    console.log(matches)


    while ((m = regex.exec(outputText)) !== null) {

        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            matches.push(match)
            
        });
        

    }
    console.log(matches)
    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`

        ),


    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText);

    console.log(matches3)

    return matches3;
  
}
