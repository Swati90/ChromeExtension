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

        shadowRoot.querySelector("#reply").addEventListener("click", () => {

            const emailContent = shadowRoot.getElementById("emailContent");
            const intentReply = shadowRoot.getElementById("intentReply");

            const message_content = emailContent.value + " " + intentReply.value;
            sendQueryToChatgpt(message_content);
        });
        //showModal();
    }else{
        shadowDomElement.showModal();
    }
}
})

const sendQueryToChatgpt = async (message_content) => {

  try {

    //let session_token = localStorage.getItem(KEY_ACCESS_TOKEN);
    //     const KEY_ACCESS_TOKEN = 'accessToken';
    let session_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJndXB0YXByYWJoYXQwMDdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItWllScjhPZmhqQkZ3VWZNMjhvb1pZbk04In0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNzU5MDU5MzAxMTI4OTk3ODQzOCIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Nzk1NzI1NzAsImV4cCI6MTY4MDc4MjE3MCwiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvZmZsaW5lX2FjY2VzcyJ9.JRx3GxqXmwwhKUtUUEOE9QBNDOW2rCn5oyn4-pqOHKrPFLkBPIx5p3dY3W8hqZaUvNVh5yfPJp3Z6fREfWLQZi5AzPb9GS_GE5aFTqe69wYAQMsKv8chCDCsV4l9RPYmwLqUeCKfrLeQ8mnub7rTtlmQd7wHPnvCyUfgCRI5ap9Z10qSX6QBAsU8OUMKapkl-gW0wIhwIATKMDdACownqd1KdVAbT0WRjNbzyCkPUQgnoQGGyegOoeGtW4Mp5zK9mzOa16j5I56zW4CxVLRW6Nr4tnAt5h_Tcd6F451TRd83LkPsHfivSX803LDhLUkaiLd6245tRBpehJFoUUhCgA';
    const chat_endpoint = 'https://api.openai.com/v1/chat/completions';
    const response = await fetch(chat_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session_token}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { "role": "user", "content": message_content }
        ]
      })
    });
    const jsonResponse = await response.json();
    let resp = jsonResponse.choices[0].message.content;
    document.getElementById('swati_1').shadowRoot.getElementById("replyGenerated").value = resp;


  } catch (error) {
    console.error(error);
  }
}

const getChatGPTAccessToken = async () => {

  console.log("getChatGPTAccessToken");
  const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJndXB0YXByYWJoYXQwMDdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItWllScjhPZmhqQkZ3VWZNMjhvb1pZbk04In0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNzU5MDU5MzAxMTI4OTk3ODQzOCIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Nzk1NzI1NzAsImV4cCI6MTY4MDc4MjE3MCwiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvZmZsaW5lX2FjY2VzcyJ9.JRx3GxqXmwwhKUtUUEOE9QBNDOW2rCn5oyn4-pqOHKrPFLkBPIx5p3dY3W8hqZaUvNVh5yfPJp3Z6fREfWLQZi5AzPb9GS_GE5aFTqe69wYAQMsKv8chCDCsV4l9RPYmwLqUeCKfrLeQ8mnub7rTtlmQd7wHPnvCyUfgCRI5ap9Z10qSX6QBAsU8OUMKapkl-gW0wIhwIATKMDdACownqd1KdVAbT0WRjNbzyCkPUQgnoQGGyegOoeGtW4Mp5zK9mzOa16j5I56zW4CxVLRW6Nr4tnAt5h_Tcd6F451TRd83LkPsHfivSX803LDhLUkaiLd6245tRBpehJFoUUhCgA';
  localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
  /*
    try {
      const response = await fetch(session_end_point, {
        method: 'GET',
        host_permissions: ["https://chat.openai.com/*"],
        headers: {
          'Content-Type': 'application/json',
          'mode': 'cors',
          'cross-origin-resource-policy': 'cross-origin'
        }
      });
      const resp = await response.json();
      console.log("resp", resp);
      if (resp.status === 403) {
        console.log("redirect to handle cloudflare issue");
      }
      else if (!resp.accessToken) {
        console.log("UNAUTHORIZED issue");
      }
      else {
        let accessToken = resp.accessToken;
        localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
      }
    } catch (error) {
      console.error(error);
    }*/
}
