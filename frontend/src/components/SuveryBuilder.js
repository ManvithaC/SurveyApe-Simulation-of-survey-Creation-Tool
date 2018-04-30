import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');

class SurveyBuilder extends Component{
    componentDidMount(){
        var formData = '[{"type":"text","label":"Full Name","subtype":"text","className":"form-control","name":"text-1476748004559"},{"type":"select","label":"Occupation","className":"form-control","name":"select-1476748006618","values":[{"label":"Street Sweeper","value":"option-1","selected":true},{"label":"Moth Man","value":"option-2"},{"label":"Chemist","value":"option-3"}]},{"type":"textarea","label":"Short Bio","rows":"5","className":"form-control","name":"textarea-1476748007461"}]';
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


        let ed = $("#editor").formBuilder({fields,templates});
        setTimeout(function(){ ed.actions.setData(formData); }, 50);
    }



    render() {
        return (
            <div>
                <div id="editor"></div>
            </div>
        );
    }
}

export default withRouter(SurveyBuilder);