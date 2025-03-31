

const surahRequest = async (id) => {
    console.log(id);
    
    if (!id) {
        return { error: true, message: "Error: Surah ID is required." };
    }

    try {
        const response = await fetch(`https://quranapi.pages.dev/api/${id}.json`);

        if (!response.ok) {
            return { error: true, message: `HTTP error! Status: ${response.status}` };
        }

        const dataJson = await response.json();
       
        return { error: false, data: dataJson };

    } catch (error) {
        return { error: true, message: "An error occurred while fetching the Surah data: " + error.message };
    }
};

export default surahRequest;
