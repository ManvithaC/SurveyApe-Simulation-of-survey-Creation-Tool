import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');

class SurveyBuilder extends Component{
    componentDidMount(){
        var formData = '[{"type":"text","label":"Survey Name","subtype":"text","className":"form-control","name":"text-1476748004559"}]';
        var fields = [{
            label: 'Star Rating',
            attrs: {
                type: 'starRating'
            },
            icon: '🌟'
        }];

        var templates = {
            starRating: function(fieldData) {
                return {
                    field: '<span id="' + fieldData.name + '">',
                    onRender: function() {
                        $(document.getElementById(fieldData.name)).rateYo({
                            rating: 3.5
                        });
                    }
                };
            }
        };

        var options = {
            disableFields: ['autocomplete','button','paragraph','number','hidden','header','actionButtons']
        };
        let ed = $("#editor").formBuilder(options);
        setTimeout(function(){ ed.actions.setData(formData); }, 50);
    }

    render() {
        return (
            <div>
                <div id="editor">
                </div>
                <button  onClick={() => {
                }}>Save
                </button>

            </div>
        );
    }
}

export default withRouter(SurveyBuilder);