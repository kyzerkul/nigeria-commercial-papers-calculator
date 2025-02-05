function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function calculate() {
    // Get input values
    const faceValue = parseFloat(document.getElementById('faceValue').value);
    const discountRate = parseFloat(document.getElementById('discountRate').value) / 100;
    const daysToMaturity = parseInt(document.getElementById('daysToMaturity').value);

    // Validate inputs
    if (!faceValue || !discountRate || !daysToMaturity) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    if (daysToMaturity > 270) {
        alert('Days to maturity cannot exceed 270 days');
        return;
    }

    // Calculate price using the formula: Price = Face Value × (1 - (Discount Rate × Days to Maturity / 360))
    const price = faceValue * (1 - (discountRate * daysToMaturity / 360));

    // Calculate discount amount
    const discountAmount = faceValue - price;

    // Calculate yield: Yield = ((Face Value - Price) / Price) × (360 / Days to Maturity)
    const yield = ((faceValue - price) / price) * (360 / daysToMaturity) * 100;

    // Update results
    document.getElementById('price').textContent = formatCurrency(price);
    document.getElementById('discount').textContent = formatCurrency(discountAmount);
    document.getElementById('yield').textContent = yield.toFixed(2) + '%';
}

function reset() {
    // Reset all input fields
    document.getElementById('faceValue').value = '';
    document.getElementById('discountRate').value = '';
    document.getElementById('daysToMaturity').value = '';

    // Reset all result displays
    document.getElementById('price').textContent = '₦ 0.00';
    document.getElementById('discount').textContent = '₦ 0.00';
    document.getElementById('yield').textContent = '0.00%';
}

function printResults() {
    // Get the current values
    const faceValue = document.getElementById('faceValue').value;
    const discountRate = document.getElementById('discountRate').value;
    const daysToMaturity = document.getElementById('daysToMaturity').value;
    
    // Only print if we have results
    if (!faceValue || !discountRate || !daysToMaturity) {
        alert('Please calculate results before printing');
        return;
    }

    // Create a print header with calculation details
    const printHeader = document.createElement('div');
    printHeader.id = 'printHeader';
    printHeader.innerHTML = `
        <p><strong>Calculation Details:</strong></p>
        <p>Face Value: ${formatCurrency(faceValue)}</p>
        <p>Discount Rate: ${discountRate}%</p>
        <p>Days to Maturity: ${daysToMaturity}</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
    `;

    // Add header temporarily
    const container = document.querySelector('.calculator-container');
    container.insertBefore(printHeader, container.firstChild);

    // Print
    window.print();

    // Remove header after printing
    printHeader.remove();
}

// Add input validation for numbers
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});
