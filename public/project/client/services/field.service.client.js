/**
 * Created by kishore on 3/18/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            updateFieldOrderInForm: updateFieldOrderInForm
        };
        return service;

        function updateFieldOrderInForm(formId, start, end) {
            return $http.put("/api/assignment/form/" + formId + "/field?start=" + start + "&end=" + end, {});
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function getFieldsForForm(formId) {
            console.log(formId);
            return $http.get("/api/assignment/form/" + formId + "/field");
        }


        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/"+ formId + "/field", field);
        }
    }
})();
