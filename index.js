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
            const objeto = criaObjetoMapa(mapa[i][j], i, j)
            quadro.id = `${i}${j}`
            quadro.style.backgroundColor = objeto.color
            
            row.appendChild(quadro)
            mapaSetado[i].push(objeto)
        }
    }
}

/**
 * @satisfies gera objeto do mapa a partir de string
 */
function criaObjetoMapa(quadro, x, y) {
    switch(quadro) {
        case 'V':
            return new Node(x, y, 1, '#92d050')
        case 'M':
            return new Node(x, y, 60, '#948a54')
        case 'A': 
            return new Node(x, y, 10, '#548dd4') 
        default:
            return new Node(x, y, 0, '#c0504d')
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

function randomizaInicioFimCaminho() {
    const linhaInicio = 19
    const colunaInicio = 19
    let linhaFim = linhaInicio
    let colunaFim = colunaInicio

    while(linhaFim === linhaInicio && colunaFim === colunaInicio) {
        linhaFim = Math.floor(Math.random() * 42)
        colunaFim = Math.floor(Math.random() * 42)
    }

    return {
        linhaFim,
        colunaFim,
    }
}

class Node {
    constructor(x, y, weight, color) {
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.color = color;
        this.esfera = false;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = null;
    }
}

/**
 * @satisfies realiza busca com algoritmo A*
 */
function astar(start, end, grid) {
    const openList = [];
    const closedList = [];
    openList.push(start);

    while (openList.length > 0) {
        // Get the node with the lowest f value
        let currentIndex = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[currentIndex].f) {
                currentIndex = i;
            }
        }
        let currentNode = openList[currentIndex];

        // Move the current node to the closed list
        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        // If we reached the end node, reconstruct the path and return it
        if (currentNode.x === end.x && currentNode.y === end.y) {
            const path = [];
            let temp = currentNode;
            while (temp) {
                path.push({ x: temp.x, y: temp.y });
                temp = temp.parent;
            }
            return path.reverse();
        }

        // Get the current node's neighbors
        const neighbors = getNeighbors(currentNode, grid);
        for (let neighbor of neighbors) {
            if (closedList.includes(neighbor)) {
                continue;
            }

            // Calculate g, h, and f values
            const tentativeG = currentNode.g + neighbor.weight;
            let betterPath = false;

            if (!openList.includes(neighbor)) {
                betterPath = true;
                neighbor.h = heuristic(neighbor, end);
                openList.push(neighbor);
            } else if (tentativeG < neighbor.g) {
                betterPath = true;
            }

            if (betterPath) {
                neighbor.parent = currentNode;
                neighbor.g = tentativeG;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    // No path found
    return [];
}

/**
 * @satisfies Busca vizinhos do nó
 */
function getNeighbors(node, grid) {
    const neighbors = [];
    const directions = [
        { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
        { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
        { dx: -2, dy: 0 }, { dx: 2, dy: 0 },
        { dx: 0, dy: -2 }, { dx: 0, dy: 2 },
        { dx: -3, dy: 0 }, { dx: 3, dy: 0 },
        { dx: 0, dy: -3 }, { dx: 0, dy: 3 },
    ];

    for (let dir of directions) {
        const newX = node.x + dir.dx;
        const newY = node.y + dir.dy;

        if (isValid(newX, newY, grid)) {
            neighbors.push(grid[newX][newY]);
        }
    }
    return neighbors;
}

/**
 * @satisfies Verifica se nó é válido
 */
function isValid(x, y, grid) {
    return x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;
}

/**
 * @satisfies cria heurística do algoritmo
 */
function heuristic(node, end) {
    // Use Manhattan distance as the heuristic
    return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
}

async function pintaMapaComCaminho(nodeArray) {
    for(const node of nodeArray) {
        const quadro = document.getElementById(`${node.x}${node.y}`)
        quadro.style.backgroundColor = '#c0504d'
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}

geraMapa()
randomizaPosicaoEsferas()
const posicoes = randomizaInicioFimCaminho()
const path = astar(
    mapaSetado[19][19], 
    mapaSetado[posicoes.linhaFim][posicoes.colunaFim],
    mapaSetado
)
pintaMapaComCaminho(path)

console.log(path)