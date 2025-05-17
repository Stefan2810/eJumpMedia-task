let allData = [];
let uniqueA = new Set();
let uniqueB = new Set();
let uniqueC = new Set();

async function loadData() {
    try {
        const response = await fetch('https://gandacel.ro/code_tests/testData.txt');
        const text = await response.text();
        const lines = text.trim().split('\n');
        allData = lines.map((line, index) => {
            const [a, b, c] = line.split(',');
            return { id: index + 1, a, b, c };
        });
        allData.forEach(item => {
            uniqueA.add(item.a);
            uniqueB.add(item.b);
            uniqueC.add(item.c);
        });
        populateSelect('filterA', Array.from(uniqueA));
        populateSelect('filterB', Array.from(uniqueB));
        populateSelect('filterC', Array.from(uniqueC));
        updateTable(allData);

    } catch (error) {
        console.error('Eroare la preluare informatii de pe site:', error);
        allData = [
            { id: 1, a: "A1", b: "B1", c: "C1" },
            { id: 2, a: "A1", b: "B1", c: "C2" },
            { id: 3, a: "A1", b: "B1", c: "C3" },
            { id: 4, a: "A1", b: "B2", c: "C4" },
            { id: 5, a: "A1", b: "B2", c: "C5" },
            { id: 6, a: "A1", b: "B3", c: "C6" },
            { id: 7, a: "A2", b: "B4", c: "C7" },
            { id: 8, a: "A2", b: "B5", c: "C8" },
            { id: 9, a: "A2", b: "B5", c: "C9" },
            { id: 10, a: "A3", b: "B6", c: "C10" }
        ];
        allData.forEach(item => {
            uniqueA.add(item.a);
            uniqueB.add(item.b);
            uniqueC.add(item.c);
        });
        populateSelect('filterA', Array.from(uniqueA));
        populateSelect('filterB', Array.from(uniqueB));
        populateSelect('filterC', Array.from(uniqueC));
        updateTable(allData);
    }
}

function populateSelect(selectId, values) {
    const select = document.getElementById(selectId);
    const currentValue = select.value;
    while (select.options.length > 1) {
        select.remove(1);
    }
    values.sort().forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
    if (currentValue && values.includes(currentValue)) {
        select.value = currentValue;
    } else if (currentValue && !values.includes(currentValue)) {
        select.value = "";
    }
}


function updateFilters() {
    const filterA = document.getElementById('filterA').value;
    const filterB = document.getElementById('filterB').value;
    const filterC = document.getElementById('filterC').value;
    let filteredData = allData.filter(item => {
        return (filterA === "" || item.a === filterA)&&(filterB === "" || item.b === filterB)&&(filterC === "" || item.c === filterC);
    });
    updateTable(filteredData);
    const recalculatedOptions = calculateAvailableOptionsBasedOnOthers(filterA, filterB, filterC);
    const currentFilterAValue = document.getElementById('filterA').value;
    const currentFilterBValue = document.getElementById('filterB').value;
    const currentFilterCValue = document.getElementById('filterC').value;
    updateSelectOptionsWithPreservation('filterA', recalculatedOptions.availableA, currentFilterAValue);
    updateSelectOptionsWithPreservation('filterB', recalculatedOptions.availableB, currentFilterBValue);
    updateSelectOptionsWithPreservation('filterC', recalculatedOptions.availableC, currentFilterCValue);
}

function calculateAvailableOptionsBasedOnOthers(currentFilterA, currentFilterB, currentFilterC) {
    let availableA = new Set();
    let availableB = new Set();
    let availableC = new Set();
    let dataForAOptions = allData;
    if (currentFilterB) {
        dataForAOptions = dataForAOptions.filter(item => item.b === currentFilterB);
    }
    if (currentFilterC) {
        dataForAOptions = dataForAOptions.filter(item => item.c === currentFilterC);
    }
    dataForAOptions.forEach(item => availableA.add(item.a));
    let dataForBOptions = allData;
    if (currentFilterA) {
        dataForBOptions = dataForBOptions.filter(item => item.a === currentFilterA);
    }
    if (currentFilterC) {
        dataForBOptions = dataForBOptions.filter(item => item.c === currentFilterC);
    }
    dataForBOptions.forEach(item => availableB.add(item.b));
    let dataForCOptions = allData;
    if (currentFilterA) {
        dataForCOptions = dataForCOptions.filter(item => item.a === currentFilterA);
    }
    if (currentFilterB) {
        dataForCOptions = dataForCOptions.filter(item => item.b === currentFilterB);
    }
    dataForCOptions.forEach(item => availableC.add(item.c));
    return {
        availableA: Array.from(availableA),
        availableB: Array.from(availableB),
        availableC: Array.from(availableC)
    };
}

function updateSelectOptionsWithPreservation(selectId, availableValues, currentValue) {
    const select = document.getElementById(selectId);
    while (select.options.length > 1) {
        select.remove(1);
    }
    availableValues.sort().forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
    if (currentValue !== "" && availableValues.includes(currentValue)) {
        select.value = currentValue;
    } else {
        select.value = "";
    }
}


function updateTable(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    if (data.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = '<td colspan="3" style="text-align:center;">No data matches the current filters.</td>';
        tbody.appendChild(noDataRow);
        return;
    }
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.a}</td>
            <td>${item.b}</td>
            <td>${item.c}</td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('filterA').addEventListener('change', updateFilters);
document.getElementById('filterB').addEventListener('change', updateFilters);
document.getElementById('filterC').addEventListener('change', updateFilters);

loadData();