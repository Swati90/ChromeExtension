//content.js
console.log("********I am loaded");
chrome.runtime.onMessage.addListener((request) => {
    console.log("message recieved!")
    if(request.type === 'popup-modal'){
        console.log("showModel request")
        const modal = document.createElement("section");
        modal.id = 'swati_1'
        modal.setAttribute(
        "style",`
        height:650px;
        width:600px;
        border: none;
        background-color:transparent;
        position: fixed; 
        display: block;
        overflow: hidden;
        z-index: 99999
              `);
        document.body.appendChild(modal);
        const container = document.getElementById('swati_1');
        if(!container.shadowRoot){
        const shadowRoot = container.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        div.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<dialog style ="width:100%;    outline: 0;background: transparent; border: none; overflow: hidden;">
        <div style ="border:none" class="container mt-3" >
        <!-- Modal -->
        <style>
        label {
          color: #7f8690;
          font-size:14px;
        }
        .form-control:focus{
          box-shadow: 0 0 0 0.25rem rgba(13,110,25, 0.1);
        }
        .modal-content{
          border-radius:20px;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 50px;
        }
        .form-control{
          color: #7f8690;
          border-radius:5px;
          background: #f4f8fb;
    border: 1px solid #e1e5eb
        }
        .modal-title{
        color: #283c51
        }</style>
        <div  style ="border:none"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
          <div class="modal-dialog" style="border:none">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title"  id="exampleModalLabel">ComposeMate</h5>
                <button type="button"  id="crossButton" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <form>
                      <div class="form-group">
                        <label for="emailContent">Email Content:</label>
                        <textarea class="form-control" id="emailContent" rows="5"></textarea>
                      </div>
                      <br/>
                      <div class="form-group">
                          <label for="intentReply">Briefly enter what do you want to reply.</label>
                          <input type="text" class="form-control" id="intentReply">
                      </div>
                      <br/>    
                      <div class="form-group">
                          <label for="replyGenerated">Reply Generated:</label>
                          <textarea class="form-control" id="replyGenerated" rows="5"></textarea>
                      </div>
                    </form>
              </div>
              <div class="modal-footer">
                <button type="button" style="" id="closeButton" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                <button type="button" id="reply" class="btn btn-outline-primary btn-sm">Generate Reply</button>
              </div>
            </div>
          </div>
        </div>
        </dialog>`;
       
        shadowRoot.appendChild(div);
        shadowDomElement = shadowRoot.querySelector('dialog');
        shadowDomElement.showModal();
        shadowRoot.querySelector("#closeButton").addEventListener("click", () => {
            console.dir(shadowDomElement)
            shadowDomElement.close();
        });
        shadowRoot.querySelector("#crossButton").addEventListener("click", () => {
          shadowDomElement.close();
        });
       
        //showModal();
    }else{
      shadowDomElement.showModal();
    }
  }
})
