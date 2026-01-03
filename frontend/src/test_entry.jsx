console.log("Test Entry Running");
try {
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = '<h1 style="color:red; font-size: 50px;">TEST WORKS</h1>';
        console.log("DOM Updated directly");
    } else {
        console.error("Root not found in test_entry");
    }
} catch (e) {
    console.error("Test Entry Error", e);
}
