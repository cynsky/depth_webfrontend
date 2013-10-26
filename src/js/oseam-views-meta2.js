// -------------------------------------------------------------------------------------------------
// OpenSeaMap Water Depth - Web frontend for depth data handling.
//
// Written in 2012 by Dominik Fässler dfa@bezono.org
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain
// worldwide. This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along
// with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
// -------------------------------------------------------------------------------------------------

OSeaM.views.meta2 = OSeaM.View.extend({
     sensorPositions:null,
	modalDialog:null,
	    events: {
        'click [name=echoSounderInFront]' : 'onEchoSounderInFront',
        'click [name=echoSounderRightOf]' : 'onEchoSounderRightOf',
        'change [name=distanceY]'         : 'onChangeDistanceY',
        'change [name=distanceX]'         : 'onChangeDistanceX'
    },
    render: function() {

	var template = OSeaM.loadTemplate('meta2');

        
        var content = $(template({
		
		echoSounderInFront:this.model.get('echoSounderInFront'),
		echoSounderRightOf:this.model.get('echoSounderRightOf'), 
		distanceY:this.model.get('distanceY'),
		distanceX:this.model.get('distanceX'),
		
	
				  }));
        OSeaM.frontend.translate(content);
        this.$el.html(content);
		
	//	alert('renderer meta2');
		 this.addSensorPosition();
        
		return this;
		
		
    },
	addSensorPosition: function() {      
//alert(this.$el.find('.oseam-canvas').toSource());	
//alert($('.oseam-canvas').toSource());	
		this.sensorPositions = new OSeaM.views.SensorPositions({	            
					el: this.$el.find('.oseam-canvas')
				//el : '.oseam-canvas'
				//	el: $('#oseam-canvas')
					
        });
		
        this.sensorPositions.render();
    },
    onEchoSounderInFront: function(evt) {
        if ($(evt.target).is(':checked') === true) {
            this.sensorPositions.setTopDevice('gps');
        } else {
            this.sensorPositions.setTopDevice('echo');
        }
    },
    onEchoSounderRightOf: function(evt) {
        if ($(evt.target).is(':checked') === true) {
            this.sensorPositions.setLeftDevice('gps');
        } else {
            this.sensorPositions.setLeftDevice('echo');
        }
    },
    onChangeDistanceY: function(evt) {
        var value = parseFloat($(evt.target).val()) * 100;
        this.sensorPositions.setVerticalDistance(value);
    },
    onChangeDistanceX: function(evt) {
	alert(this.sensorPositions.toSource());
        var value = parseFloat($(evt.target).val()) * 100;
        this.sensorPositions.setHorizontalDistance(value);
    },
    validate: function() {
	  this.removeAlerts();
        var errors = [];
        		
		if (OSeaM.utils.Validation.distanceY(this.model.get('distanceY')) !== true){
			this.markInvalid($('#distanceY'), '1103:Please enter a decimal (e.g. 5.5)');
            //what is this for?
			//errors.push('1004:Email');
        }
		if (OSeaM.utils.Validation.distanceX(this.model.get('distanceX')) !== true){
			this.markInvalid($('#distanceX'), '1103:Please enter a decimal (e.g. 5.5)');
            //what is this for?
			//errors.push('1004:Email');
        }
		
        return this.isValid;
    	
    },
	    markInvalid: function(field, text) {
        field.parents('.control-group').addClass('error');
        //field.next('.help-inline').attr('data-trt', text);
	    this.$el.find('.help-inline').attr('data-trt', text);  
        OSeaM.frontend.translate(this.$el);
        this.isValid = false;
    },
    removeAlerts: function() {
        this.$el.find('.alert').remove();
        this.$el.find('.control-group').removeClass('error');
        this.$el.find('.help-inline').removeAttr('data-trt');
        this.$el.find('.help-inline').html('');
        this.isValid = true;
    }
});