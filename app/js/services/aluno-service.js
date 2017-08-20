"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AlunoService = (function () {
    function AlunoService() {
    }
    AlunoService.prototype.listarTodos = function () {
        var alunos = sessionStorage['alunos'];
        return alunos ? JSON.parse(alunos) : [];
    };
    AlunoService.prototype.cadastrar = function (aluno) {
        var alunos = this.listarTodos();
        alunos.push(aluno);
        sessionStorage['alunos'] = JSON.stringify(alunos);
    };
    AlunoService.prototype.atualizar = function (id, aluno) {
        var alunos = this.listarTodos();
        alunos[id].nome = aluno.nome;
        alunos[id].email = aluno.email;
        sessionStorage['alunos'] = JSON.stringify(alunos);
    };
    AlunoService.prototype.excluir = function (id) {
        var alunos = this.listarTodos();
        alunos.splice(id, 1);
        sessionStorage['alunos'] = JSON.stringify(alunos);
    };
    AlunoService.prototype.buscarPorId = function (id) {
        var alunos = this.listarTodos();
        return alunos[id];
    };
    return AlunoService;
}());
AlunoService = __decorate([
    core_1.Injectable()
], AlunoService);
exports.AlunoService = AlunoService;
//# sourceMappingURL=aluno-service.js.map