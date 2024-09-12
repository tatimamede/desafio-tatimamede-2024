class RecintosZoo {

    analisaRecintos(animal, quantidade) {
    }

}

export { RecintosZoo as RecintosZoo };
var especie = prompt('Digite a especie do animal:');
var quantidade = prompt('Digite a quantidade:');
console.log('Especie: ' + especie + ',Quantidade: ' + quantidade);

class RecintosZoo {
    constructor() {
      // Definir recintos e animais
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: { 'LEAO': 1, 'MACACO': 3 } },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: {} },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { 'GAZELA': 1 } },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: {} },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: { 'LEAO': 1 } },
      ];
  
      this.animais = {
        'LEAO': { tamanho: 3, bioma: 'savana' },
        'LEOPARDO': { tamanho: 2, bioma: 'savana' },
        'CROCODILO': { tamanho: 3, bioma: 'rio' },
        'MACACO': { tamanho: 1, bioma: 'savana ou floresta' },
        'GAZELA': { tamanho: 2, bioma: 'savana' },
        'HIPOPOTAMO': { tamanho: 4, bioma: 'savana ou rio' },
      };
    }
  
    validaEntrada(animal, quantidade) {
      if (!this.animais[animal]) {
        return 'Animal inválido';
      }
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return 'Quantidade inválida';
      }
      return null;
    }
  
    calculaEspacoLivre(recinto, animal, quantidade) {
      let tamanhoAnimal = this.animais[animal].tamanho;
      let espacoOcupado = quantidade * tamanhoAnimal;
  
      // Verificar número de espécies existentes
      let especiesExistentes = Object.keys(recinto.animais);
      let numEspecies = especiesExistentes.length;
      if (numEspecies > 0) {
        espacoOcupado += 1; // Espaço extra se houver outras espécies
      }
  
      return recinto.tamanho - (espacoOcupado + Object.values(recinto.animais).reduce((a, b) => a + b * tamanhoAnimal, 0));
    }
  
    analisaRecintos(animal, quantidade) {
      let erro = this.validaEntrada(animal, quantidade);
      if (erro) {
        return { erro };
      }
  
      let recintosViaveis = [];
      this.recintos.forEach(recinto => {
        let animalInfo = this.animais[animal];
        if (recinto.bioma.includes(animalInfo.bioma) || (animalInfo.bioma === 'savana ou floresta' && recinto.bioma === 'floresta') || (animalInfo.bioma === 'savana ou rio' && recinto.bioma === 'savana e rio')) {
          let espacoLivre = this.calculaEspacoLivre(recinto, animal, quantidade);
          if (espacoLivre >= 0) {
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
          }
        }
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis };
    }
  }
  
  
  