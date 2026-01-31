const resourceName = (typeof GetParentResourceName === "function" && GetParentResourceName()) || "kn_lightbar";

function postToResource(endpoint, payload)
{
  $.post(`https://${resourceName}/${endpoint}`, JSON.stringify(payload || {}));
}

function fadeIfExists(element, action)
{
  if (element.length)
  {
    element[action]();
  }
}

$(function()
{
  const container = $('#container');
  const adminPanel = $('#admin');
  const playersList = $('#players');

  $(document).keyup(function(e)
  {
    if (e.keyCode == 27)
    {
      fadeIfExists(container, 'fadeOut');
      fadeIfExists(adminPanel, 'fadeOut');
      postToResource('close');
    }
  });

  //get info from client side
  window.addEventListener('message', function(event)
  {
    var kn = event.data;
    if (kn.action == 'open')
    {
      fadeIfExists(container, 'fadeIn');
      if (playersList.length && kn.players)
      {
        playersList.html(kn.players);
      }
    }

  }, false);

  $("#back").click(() =>
  {
    if (adminPanel.length)
    {
      adminPanel.css('display', 'none');
    }
    container.css('display', 'block');
  });

});

function OpenMenu(type)
{
  fadeIfExists($('#container'), 'fadeOut');
  postToResource('use', { type: type });
}