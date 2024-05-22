const mapa = [
    'VVVVVVVMVMVMVMVVVVVAAAAVVVVVVVVMVMMMMMVVVV',
    'MVMMMMVVVVVMVMVMMMMAAAAVVMMMMVVMVVVVVMVMMM',
    'VVVVVVVMMMMMVMVVVVAAAAAAVVVVMVVMVMMMVMVMMM',
    'VMMMMVVMVVVVVVVVAAAAAAAAAAVVMVVMVVVMVVVVVV',
    'VMVVMVVMVMVMMMVAAAAAAAAAAAAVMMVMMMVMMMMVMM',
    'VMVVMVVVVMVVMVVAAAAAAAAAAAAVVVVVVMVVVVMVVV',
    'VMMVMVVMVMVMAAAAAAAAAAAAAAAAAVVMVMMMMVMMMM',
    'VVVVMMMMVMVMAAAAAAAVVVVAAAAAAAVVVVVVVVVVVV',
    'VMVVMVVVVMAAAAAAAAMMMMVVVAAAAAAAVMMMVMMMMM',
    'VMMMMMMVVVAAAAAAVVMVVVVMMVAAAAAAVMVMVMVVVV',
    'VVVMVVVVAAAAAAAAVVMMMMVVVVVVAAAAVMVMVMMVMM',
    'VVMMAAAAAAAAAAAAVVVVVMVMMMVVVAAAVVVVVVVVVV',
    'MMAAAAAAAAAAAAAAAVMMVMVMVVVVVAAAAAVMMMMVMV',
    'AAAAAAVVAAAAAAAAAAVVVMVVVAAAAAAAAAVVVVMVMV',
    'AAAAAAVVAAAAAAAAAAAAVVVVAAAAAAAAAAAAAVMVMV',
    'AAAAAVVMMMVAAAAAAAAAAAAAAAAAAAAVAAAAAVMMMM',
    'AAAMVVVMVMVAAAAAAAAAAAAAAAAAAAMVMAAAAVVVVV',
    'AAVMVMMMVMVAAAAAAAAAVAAAAAAAAAMVMMAAAAVMMV',
    'VVMMVVVMVMMAAAAAAAAVVVAAAAAAAAMVMAAAAAAVMV',
    'MMMVVMMMVVVAAAAAAVVRVVAAAAAAAAAAAAAAAAAVMM',
    'VVVVVMVVAAAAAAAAAAVVVAAAAAAAAVVVVVAAAAAAVV',
    'MMVMMMVAAAAAAAAAAAAVAAAAAAAAAVMMMMAAAAAAAA',
    'VVVVMVVAAAAMMMAAAAAAAAAAAAAMMMMVVMAAAAAAAA',
    'VMMMMVVAAAVVVMAAAAAAAAAAAAAMVVVVVMAAAVVAAA',
    'VMVVVVMAAAAMMMAAAAAAAAAAAAVMVMMMVMMMVVVVAA',
    'VMVVMMMMVAAAAAAAAAAAAAAAAAMMVMVMVVMVMMMVAA',
    'VVVVMVVMVAAAAAAAAMMMAAAAAAVVVMVVVMMVMVMVAA',
    'AVMVMVVVVVVVVAAAVVVVVVAAAAMMVMMMVMVVVVMVAA',
    'AVMVMMMMVVMMVAAAVVMMVVAAAAVMVVVVVVVMMMMVAA',
    'AAAVVVVMVVMVVAAAMVVMMVAAAAVMMMMMVMMVVVAAAA',
    'AAAVMMVVVVVVVAAAAMVVMVAAAAAAMVVVVMVAAAAAAA',
    'AAAAAAMVAAAAAAAAAAAVVVAAAAAAMMMMMMAAAAMMMM',
    'VAAAAMVAAAAAAAAAAAAAVVAAAAAAVVVVVVAAAMMVVV',
    'VVMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMVVMV',
    'VVMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVVVMV',
    'VAAAAVVAAAAAAAAAVVVVVVVVVAAAAAAAAAAAAMMVVV',
    'AAAAAVMAAAAAAAAVVMMMVMMMVVVAAAAAMMMAAAMMMM',
    'AAAAAVVVAAAAAAMVVVVVVMVMVMMAAAAVMVMVAAAAAA',
    'AAAVVVVVAAAAAMMVMVVVVMVMVVVMVAAVMVMVAAAAAA',
    'AAAVMMVMMMVAVMVVMVMMMMVMMMVMVAAVMVMVVVVAAA',
    'AVVVVVVVVMVVVVVVVVMVVVVVVMVMVVVMMVMMVVMVAA',
    'AVMMVVMMVVVVVMVMMVVVMMVMVVVVVMVVVVVVMVVVAA'
]
const mapaSetado = []
const qntEsferas = 7

/**
 * @satisfies gera mapa e informações do mapa
 */
function geraMapa() {
    const table = document.getElementById('mapa')
    
    for(let i = 0; i < mapa.length; i++) {
        const row = document.createElement('tr')
        table?.appendChild(row)
        mapaSetado.push([])
        
        for (let j = 0; j < mapa[i].length; j++) {
            const quadro = document.createElement('td')
            const objeto = criaObjetoMapa(mapa[i][j])
            quadro.id = `${i}${j}`
            quadro.style.backgroundColor = objeto.cor
            
            row.appendChild(quadro)
            mapaSetado[i].push(objeto)
        }
    }
}

/**
 * @satisfies gera objeto do mapa a partir de string
 * @param quadro string que representa uma célula do mapa
 * @returns objeto com informações relevantes para o quadro
 */
function criaObjetoMapa(quadro) {
    switch(quadro) {
        case 'V':
            return {
                peso: 1,
                cor: '#92d050',
                visitado: false,
                esfera: false,
            }
        case 'M':
            return {
                peso: 60,
                cor: '#948a54',
                visitado: false,
                esfera: false,
            }
        case 'A': {
            return {
                peso: 10,
                cor: '#548dd4',
                visitado: false,
                esfera: false,
            }
        }
        default:
            return {
                peso: 0,
                cor: '#c0504d',
                visitado: false,
                esfera: false,
            }
    }
}

/**
 * @satisfies gera posições randômicas para as esferas
 */
function randomizaPosicaoEsferas() {
    for(let i = 0; i < qntEsferas; i++) {
        const linha = Math.floor(Math.random() * 42)
        const coluna = Math.floor(Math.random() * 42)

        if (mapaSetado[linha][coluna].esfera) {
            i--
            continue
        }

        mapaSetado[linha][coluna].esfera = true
    }
}

geraMapa()
randomizaPosicaoEsferas()