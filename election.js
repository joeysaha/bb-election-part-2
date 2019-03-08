document.addEventListener("DOMContentLoaded", function() {

  // Imagination!

  const candidate = document.querySelector('#elect');
  function ajaxCall() {
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      data: {},
      dataType: 'json'
    }).done((responseData)=>{
      for (var i = 0; i < responseData.candidates.length; i++) {
        let list = document.createElement('li');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        p1.innerText = `Name: ${responseData.candidates[i].name}.`;
        p2.innerText = `Votes: ${responseData.candidates[i].votes}.`;
        list.innerText = `Candidate ${i+1}: \n`
        list.append(p1);
        list.append(p2);
        candidate.append(list);

        let form = document.createElement('form');
        form.setAttribute("action", "https://bb-election-api.herokuapp.com/vote");
        form.setAttribute("method", "POST");

        let formButton = document.createElement('button');
        formButton.setAttribute("type", "submit");
        formButton.innerText = "Submit your Vote";
        formButton.classList.add('vote');

        let hiddenField = document.createElement('input');
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "name");
        hiddenField.setAttribute("value", responseData.candidates[i].name);

        form.append(formButton);
        form.append(hiddenField);
        list.append(form);
      }
    });
  }
  candidate.addEventListener('submit', e=>{
    e.preventDefault();
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/vote',
      method: 'POST',
      data: $(e.target).serialize(),
    }).done((responseData)=>{
      refreshContent();

      // candidateName = this.querySelector('input[type=hidden]').value;
      console.log("success");
    });
  });

  ajaxCall();
  const refreshButton = document.querySelector('.refresh');
  refreshButton.addEventListener('click', ()=>{
    refreshContent();
  });
  function refreshContent() {
    candidate.innerText = '';
    ajaxCall();
    let formButtons = document.querySelectorAll('.vote');
    formButtons.forEach((voteButton)=>{
      voteButton.setAttribute('disabled', 'true');
    })
  }
});
