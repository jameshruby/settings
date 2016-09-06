function websockets() {
  if (!("WebSocket" in window)) {
      $('#chatLog, input, button, #examples').fadeOut("fast");
      $('<p>Oh no, you need a browser that supports WebSockets. How about <a href="http://www.google.com/chrome">Google Chrome</a>?</p>').appendTo('#container');
  } else {
      // The user has WebSockets
      this.connect();
  } //End else
}

websockets.prototype.connect = function() {
// var socket;
var host = "ws://localhost:8081/";
var self = this;
try {
    socket = new WebSocket(host);

    socket.onopen = function () {
        // message('<p class="event">Socket Status: ' + socket.readyState + ' (open)');
    }

    socket.onmessage = function (msg) {
        var command = JSON.parse(event.data);
        switch (command.Action) {
            case 'data':
                         console.log(command.Data);
         self.generateUI(command.Data);
                break;

            // case 'chat-join':
            //     writeOutput('<i><b>' + username +
            //         '</b> has joined the chat.</i>');
            //     break;

            // case 'chat-leave':
            //     writeOutput('<i><b>' + username + 
            //         '</b> has left the chat.</i>');
            //     break;
        }
};

    socket.onclose = function () {
        message('<p class="event">Socket Status: ' + socket.readyState + ' (Closed)');
    }

} catch (exception) {
    this.message('<p>Error' + exception);
}

}; //End connect

websockets.prototype.alertme = function()
{alert('hi')};

websockets.prototype.generateUI = function(projectSettigs) {
    console.log(projectSettigs);
    var addonsList = document.querySelector('#contentq');

        for (var i = 0; i < projectSettigs.nodes.length; i++) {
            dlc = projectSettigs.nodes[i];
            for (var z = 0; z < dlc.nodes.length; z++) {
                
                var addon = dlc.nodes[z];
                var tmpl = document.querySelector('#box-template');   
                
                tmpl.content.querySelector('.comment-body').value = addon.Name;  
                var propertiesList = tmpl.content.querySelector('.table-content'); 

                var clone = document.importNode(tmpl.content, true);
                
                
                for (var x = 0; x < addon.properties.length; x++) {
                    property = addon.properties[x];

                    var tmplInner = document.querySelector('#properties-template');   
                    tmplInner.content.querySelector('.property_name').value = property.Name;
                    tmplInner.content.querySelector('.property_value').value = property.Value;
                    
                    var clone2 = document.importNode(tmplInner.content, true);
                    clone.querySelector('.table-content').appendChild(clone2); 
                }
                addonsList.appendChild(clone); 
            }
        }
};

websockets.prototype.search = function(expression) {
        for (var i = 0; i < projectSettigs.nodes.length; i++) {
            dlc = projectSettigs.nodes[i];
            
            if (dlc.Name == expression) {
                alertme();
            }
            
            for (var z = 0; z < dlc.nodes.length; z++) {
                var addon = dlc.nodes[z];
                if (addon.Name == expression) {
                   alertme();
                }

                for (var x = 0; x < addon.properties.length; x++) {
                    property = addon.properties[x];
                }
            }
        }
};

websockets.prototype.send = function() {
      var text = $('#text').val();

      if (text == "") {
          message('<p class="warning">Please enter a message');
          return;
      }
      try {
          socket.send(text);
          message('<p class="event">Sent: ' + text)

      } catch (exception) {
          message('<p class="warning">');
      }
      $('#text').val("");
  };


websockets.prototype.searchServer = function() {
      
        try {
            socket.send("search:3den");
           
        } catch (exception) {
            message('<p class="warning"></p>');
        }
      ;
    };



  websockets.prototype.message = function(msg) {
        $('#appContent').append(msg);
    };

    // $('body').keypress(function (event) {
    //     if (event.keyCode == '13') {
    //         searchServer();
    //     }
    //     if (event.keyCode == '83') {
    //       alert('fd');
    //         searchServer();
    //     }
    // });

    // $('#disconnect').click(function () {
    //     socket.close();
    // });



