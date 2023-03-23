InboxSDK.load(2, 'sdk_compose-mate_54bb2bcbe8').then(function (sdk) {

    // the SDK has been loaded, now do something with it!
    sdk.Compose.registerComposeViewHandler(function (composeView) {

        // a compose view has come into existence, do something with it!
        composeView.addButton({
            title: "Compose Mate",
            iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
            onClick: function (event) {
                var list= document.getElementsByClassName("ii");
				if (list.length > 0) console.log(list[0].innerText);

                //event.composeView.insertTextIntoBodyAtCursor('Hello World!');
            },
        });

    });
});