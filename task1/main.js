document.addEventListener('DOMContentLoaded', function() {
    console.log("Start fct");
    const circles = [document.getElementById('redCircle'), document.getElementById('blueCircle')];
    const squares = [document.getElementById('redSquare'), document.getElementById('blueSquare')];
    const locked = {
        redCircle: false,
        blueCircle: false
    };
    let draggedCircle = null;
    // Incepe procesul de drag
    circles.forEach(circle => {
        circle.addEventListener('dragstart', dragStart);
        circle.addEventListener('dragend', dragEnd);
        console.log("Initializat drag-ul pe cercuri");
    });
    // Incepe procesul de drop
    squares.forEach(square => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', drop);
        console.log("Initializat drop-zone pe patrate");
    });
    
    function dragStart(e) {
        if (locked[e.target.id]) {
            e.preventDefault();
            console.log("Cercul nu poate fi tras");
            return;
        }
        draggedCircle = e.target;
        e.target.style.opacity = '0.5';
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function drop(e) {
        e.preventDefault();
        if (!draggedCircle || locked[draggedCircle.id]) 
            return;        
        const circleColor = draggedCircle.id.includes('red') ? 'red' : 'blue';
        const squareColor = e.target.id.includes('red') ? 'red' : 'blue';
        if (circleColor === squareColor) {
            console.log("Aceeasi culoare, se face drop");
            const squareRect = e.target.getBoundingClientRect();
            const circleRect = draggedCircle.getBoundingClientRect();
            draggedCircle.style.position = 'fixed';
            draggedCircle.style.left = `${squareRect.left + (squareRect.width - circleRect.width) / 2}px`;
            draggedCircle.style.top = `${squareRect.top + (squareRect.height - circleRect.height) / 2}px`;
            draggedCircle.classList.add('locked');
            locked[draggedCircle.id] = true;
        } else {
            // Daca nu e patratul corect, return la pozitia initiala
            draggedCircle.style.position = '';
            draggedCircle.style.left = '';
            draggedCircle.style.top = '';
        }
        
        draggedCircle.style.opacity = '1';
    }
    
    function dragEnd() {
        if (draggedCircle) {
            draggedCircle.style.opacity = '1';
            draggedCircle = null;
        }
    }
});