const resourceName = (typeof GetParentResourceName === "function" && GetParentResourceName()) || "kn_lightbar";

function postToResource(endpoint, payload)
{
  $.post(`https://${resourceName}/${endpoint}`, JSON.stringify(payload || {}));
}

$(function()
{
  $(document).keyup(function(e)
  {
    if (e.keyCode == 27)
    {
      $('#container').fadeOut();
      $('#admin').fadeOut();
      postToResource('close');
    }
  });

  //get info from client side
  window.addEventListener('message', function(event)
  {
    var kn = event.data;
    if (kn.action == 'open')
    {
      $('#container').fadeIn();
      $('#players').html(kn.players);
    }

  }, false);

  $("#back").click(() =>
  {
    $('#admin').css('display', 'none');
    $('#container').css('display', 'block');
  });

});

function OpenMenu(type)
{
  $('#container').fadeOut();
  postToResource('use', { type: type });
}