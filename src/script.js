// Useful variables
const museumName = $("#museumName");
const creatorsList = $("#creators");
const exhibitionsList = $("#exhibitions");
const artworksList = $("#artworks");

const creatorsUrl = "https://openaccess-api.clevelandart.org/api/creators";
const exhibitionsUrl = "https://openaccess-api.clevelandart.org/api/exhibitions/";
const artworksUrl = "https://openaccess-api.clevelandart.org/api/artworks/";

// Display data for Creators
const getCreators = () => {
    fetch(creatorsUrl)
        .then(response => response.json())
        .then(data => {
            museumName.text("Cleveland Museum of Art products list");


            data.data.slice(0, 5).forEach((creator) => {
                const listItem = $("<li>", {
                    class: "creator",
                    text: creator.description
                });

                listItem.on("click", () => {
                    alert(`Display information for creator: ${JSON.stringify(creator.name)}`);
                });

                creatorsList.append(listItem);
            });
        })
        .catch(error => console.error("Error creator information:", error));
};

// Display data for Exhibitions
const getExhibitions = () => {
    fetch(exhibitionsUrl)
        .then(response => response.json())
        .then(data => {

            data.data.slice(0, 5).forEach((exhibition) => {
                const listItem = $("<li>", {
                    class: "exhibition",
                    text: exhibition.title
                });

                listItem.on("click", () => {
                    alert(`Display information for Exhibition: ${JSON.stringify(exhibition.title)}`);
                });

                exhibitionsList.append(listItem);
            });
        })
        .catch(error => console.error("Error Exhibition information:", error));
};

// Display data for Artworks
const getArtworks = () => {
    fetch(artworksUrl)
        .then(response => response.json())
        .then(data => {

            data.data.slice(0, 5).forEach((artwork) => {
                const artworkListItem = $("<li>", {
                    class: "artwork",
                    text: `${artwork.title} by ${artwork.creators[0].description}`
                });

                const button = $("<button>", {
                    class: "btn btn-primary custom-button",
                    text: "Show Image"
                });

                const artworkImageContainer = $("<div>", {
                    class: "artworkImageContainer"
                });

                button.on("click", () => {
                    showArtworkImage(artwork.images.web.url, artworkImageContainer);
                });

                artworkListItem.append(button, artworkImageContainer);
                artworksList.append(artworkListItem);
            });
        })
        .catch(error => console.error("Error Artworks information:", error));
};

// Show Artwork image
const showArtworkImage = (imageUrl, artworkContainer) => {
    const imageElement = $("<img>", {
        src: imageUrl,
        alt: "Artwork Image"
    });

    if (artworkContainer.children().length === 0) {
        imageElement.css("display", "block");
        artworkContainer.html(imageElement);
    } else {
        artworkContainer.empty();
    }
};

// Display Creators and Exhibitions and Artworks on the main page
getCreators();
getExhibitions();
getArtworks();
