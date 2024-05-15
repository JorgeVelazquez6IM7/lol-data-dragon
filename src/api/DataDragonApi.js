const _key = "gHU54mQSN71N3Iuy3RjURzxUAawqALcs";
const _version = '14.3.1';

export const getChampions = async( languageId ) => {
    const url = `https://ddragon.leagueoflegends.com/cdn/14.3.1/data/${languageId}/champion.json`;
    const resp = await fetch(url);
    const data = await resp.json();

    return(data);
}

export const getChamp = async( languageId, champId ) => {
    const url = `https://ddragon.leagueoflegends.com/cdn/14.3.1/data/${languageId}/champion/${champId}.json`;
    const resp = await fetch(url);
    const data = await resp.json();

    return(data);
}