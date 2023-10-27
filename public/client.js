$( document ).ready(function() {
  let  items = [];
  let  itemsRaw = [];
  
  $.getJSON('/api/supply', function(data) {
    itemsRaw = data;
    $.each(data, function(i, val) {
      items.push('<li class="supplyItem" id="' + i + '">' + val.title + ': '+val.steps.length + ' steps</li>');
      return ( i !== 14 );
    });
    if (items.length >= 15) {
      items.push('<p>...and '+ (data.length - 15)+' more.</p>');
    }
    $('<ul/>', {
      'class': 'listWrapper',
      html: items.join('')
      }).appendTo('#display');
  });
  
  let steps = [];
  $('#display').on('click','li.supplyItem',function() {
    $("#detailTitle").html('<b>'+itemsRaw[this.id].title+'</b> (id: '+itemsRaw[this.id]._id+')');
    $.getJSON('/api/supply/'+itemsRaw[this.id]._id, function(data) {
      steps = [];
      steps.push('<br><form id="newStepForm"><input style="width:300px" type="date" class="form-control" id="stepToAdd" name="step" placeholder="New step"></form>');
      steps.push('<br><button class="btn btn-info addStep" id="'+ data._id+'">Add Step</button>');
      steps.push('<button class="btn btn-danger deleteSupply" id="'+ data._id+'">Delete Supply</button>');
      $.each(data.steps, function(i, val) {
        steps.push('<li>' +val+ '</li>');
      });
      $('#detailSteps').html(steps.join(''));
    });
  });
  
  $('#supplyDetail').on('click','button.addStep',function() {
    let newStep = $('#stepToAdd').val();
    $.ajax({
      url: '/api/supply/'+this.id,
      type: 'post',
      dataType: 'json',
      data: $('#newStepForm').serialize(),
      success: function(data) {
        steps.push(newStep); //adds new step to top of list
        $('#detailSteps').html(steps.join(''));
      }
    });
  });
  
  $('#supplyDetail').on('click','button.deleteSupply',function() {
    $.ajax({
      url: '/api/supply/'+this.id,
      type: 'delete',
      success: function(data) {
        //update list
        $('#detailSteps').html('<p style="color: red;">'+data+'<p><p>Refresh the page</p>');
      }
    });
  });  

  $('#newSupply').click(function() {
    $.ajax({
      url: '/api/supply',
      type: 'post',
      dataType: 'json',
      data: $('#newSupplyForm').serialize(),
      success: function(data) {
        //update list
      }
    });
  });
    
});