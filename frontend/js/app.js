const app = {
    init: function() {
        console.log('app.init()');

        // On appelle la méthode s'occupant d'ajouter les EventListener sur les éléments déjà dans le DOM
        app.addAllEventListeners();

        // On appelle la méthode s'occupant de charger tous les jeux vidéo
        app.loadVideoGames();
    },


    addAllEventListeners: function() {
        // On récupère l'élément <select> des jeux vidéo
        const selectMenuElement = document.querySelector('select#videogameId');        
        // On ajoute l'écouteur pour l'event "change", et on l'attache à la méthode app.handleVideogameSelected
        selectMenuElement.addEventListener('click', app.handleVideogameSelected);

        // On récupère le bouton pour ajouter un jeu vidéo
        const addVideogameButtonElement = document.getElementById('btnAddVideogame');
        // On ajoute l'écouteur pour l'event "click"
        addVideogameButtonElement.addEventListener('click', app.handleClickToAddVideogame);

        // on récupère le bouton submit du form d'ajout
        const submitnewVideogameButton = document.querySelector('form#addVideogameForm');
        console.log(submitnewVideogameButton);
        submitnewVideogameButton.addEventListener('submit', app.handleNewVideogameSubmission);
        
    },


    handleVideogameSelected: function(evt) {
        // Récupérer la valeur du <select> (id du videogame)
        const selectOptionValue = evt.currentTarget.value;
        console.log(selectOptionValue);
        // Vider le contenu de div#review
        const divReview= document.querySelector('div#review');
        divReview.textContent = "";

        // charger les données pour ce videogame
        // Dupliquer la template #reviewTemplate et personnaliser son contenu avec les données
        const reviewCloneElement = document.querySelector('#reviewTemplate').content.cloneNode( true );
       
        // on envoi une requête HTTP afin de charger les reviews associées au jeu
        // On va créer un objet de configuration pour fetch
        const fetchOptions = {
            method : "GET",
            mode   : "cors",
            cache  : "no-cache"
        };
    
      // On envoi la requête via fetch()
      fetch(app.apiRootUrl+'/videogames/'+selectOptionValue+'/reviews', fetchOptions)
      .then(function(response) {console.log('BORDEL'); return response.json();})
      .then(function(json) {console.log(json); console.log('NIQUE'); });

       // Ajouter dans le DOM
        divReview.appendChild(reviewCloneElement);
    },


    handleClickToAddVideogame: function(evt) {
        // jQuery obligatoire ici
        $('#addVideogameModal').modal('show');
    },


    /**
     * méthode gérant l'ajout d'un nouveau jv 
     */
    handleNewVideogameSubmission: function(evt) {
        evt.preventDefault();

        const formEl = evt.currentTarget;
        console.log(formEl);

        const videogameNameValue = formEl.querySelector('input#inputName').value;
        const videogameEditorValue = formEl.querySelector('input#inputEditor').value;

        const data = {
            name: videogameNameValue,
            editor: videogameEditorValue,
            status: 1
          };
      
          const httpHeaders = new Headers();
          httpHeaders.append("Content-Type", "application/json");
      
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
       
        fetch(app.apiRootUrl+'/videogames', fetchOptions).then(function(response) {if (response.status == 200) { return response.json();} else {alert('L\'ajout a échoué'); }})
        .then(function(newVideogameJson){ 
            console.log(newVideogameJson);  
            const newSelectOptionValue = newVideogameJson.id;
            // Ajout de la tache fraichement créée à la liste des taches (et donc au DOM)
            app.createOption(videogameNameValue, newSelectOptionValue);
            alert('ajout effectué');
            $('#addVideogameModal').modal('hide');
        })
        

    },


    /**
     * méthode permettant de charger les JV pour le menu select
     */
    loadVideoGames: function() {
        // Charger toutes les données des videogames
        // On va créer un objet de configuration pour fetch
        const fetchOptions = {
            method : "GET",
            mode   : "cors",
            cache  : "no-cache"
        };
    
        fetch(app.apiRootUrl+"/videogames", fetchOptions) // J'envoi la requete
       .then(function(response) {return response.json()}) // Je traduit en JSON la réponse une fois reçue
       .then(function(json) {console.log(json); videogameOptions(json);}) //que je return pour la suite

        // Ajouter une balise <option> par videogame
        function videogameOptions(json) {
            for(const videogame of json){
                const newOptionName = videogame.name;
                const newOptionValue = videogame.id;
                app.createOption(newOptionName, newOptionValue);
            }
        }
    },


    createOption: function(name, id) {
        // Récupérer le <select> dans lequel on va ajouter des options
        const videogamesSelectMenu = document.querySelector('select#videogameId');

        // on crée une option avec nom et value et on l'append au menu 
        const newOption = document.createElement('option');
        newOption.textContent = name;
        newOption.value = id;

        videogamesSelectMenu.appendChild(newOption);
        
    },


    apiRootUrl:'http://localhost:8080',

};

document.addEventListener('DOMContentLoaded', app.init);