var version = "0.2.2";

// vSAN minimum, maximums, and available disk sizes
var vSAN = {
    maxDisks: 24,
    minDisks: 2,
    diskSizes: [
        "240GB",
        "480GB",
        "960GB",
        "1.6TB",
        "1.8TB",
        "1.92TB",
        "2.4TB",
        "3.2TB",
        "3.84TB", 
        "7.68TB",
        "8TB",
        "15.36TB"
    ],
    embeddedTiB: {
        VCF: 1,
        VVF: 0.097
    }
};

// VMware license options
var license = {
    vSphere: {
        VCF: "VMware Cloud Foundation",
        VVF: "VMware vSphere Foundation",
        VVS: "VMware vSphere Standard",
        VVEP: "vSphere Essentials Plus"
    },
    vSAN: {
        vSAN: "vSAN capacity add-on (TiB)"
    },
    minCores: 16,
    terms: {
        3: "3-year",
        1: "1-year"
    }
};

// List prices
var listPrice = {
    VCF: {
        3: 350 * 3, 
        1: Math.ceil(350 / 0.7)
    },
    VVF: {
        3: 135 * 3,
        1: Math.ceil(135 / 0.7),
    },
    VVS: {
        3: 50 * 3,
        1: Math.ceil(50 / 0.7)
    },
    VVEP: {
        3: 35 * 3,
        1: Math.ceil(35 / 0.7)
    },
    vSAN: {
        3: 210 * 3,
        1: Math.ceil(210 / 0.7)
    }
};


// Toggle interface mode between dark and light
function toggleTheme() {
    var button = document.getElementById("bd-theme");
    if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
        // Switch Bootstrap theme
        document.documentElement.setAttribute("data-bs-theme", "light");
        // Change logo
        document.getElementById("logo").setAttribute("src", "Trace3_logo_Black-Blue.png");
        // Change button icon
        document.getElementById("btnTheme1").setAttribute("d", "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708");
        document.getElementById("btnTheme2").setAttribute("d", "");
        // Change button theme
        button.classList.remove("btn-light");
        button.classList.add("btn-dark");
        // Save choice to local
        localStorage.setItem("theme", "light");
    } else {
        // Switch Bootstrap theme
        document.documentElement.setAttribute("data-bs-theme", "dark");
        // Change logo
        document.getElementById("logo").setAttribute("src", "Trace3_logo_White-Blue.png");
        // Change button icon
        document.getElementById("btnTheme1").setAttribute("d", "M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278");
        document.getElementById("btnTheme2").setAttribute("d", "M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z");
        // Change button theme
        button.classList.remove("btn-dark");
        button.classList.add("btn-light");
        // Save choice to local
        localStorage.setItem("theme", "dark");
    }
}

// Apply user's media preference. Check if a local setting exists and use that else default to device setting
function onLoad() {
    // Theme
    var theme = localStorage.getItem("theme");
    if (typeof theme !== "undefined" && theme === "light") {
        // Switch to light theme if local setting
        toggleTheme();
    } else if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // Switch to light theme if device preference
        toggleTheme();
    }

    // Add bottom padding to <main> to avoid <footer> hiding content
    var elemFooter = document.getElementById('footer');
    var footerHeight = parseInt(elemFooter.offsetHeight);
    var footerMarginTop = parseInt(window.getComputedStyle(elemFooter).marginTop);
    var footerMarginBottom = parseInt(window.getComputedStyle(elemFooter).marginBottom);
    document.querySelector('main').style.paddingBottom = (footerHeight + footerMarginTop + footerMarginBottom) + 'px';

    // Add listeners for navigation
    document.getElementById("nav-fullview").addEventListener("click", function() {
        switchView('fullview');
    });
    document.getElementById("nav-clusters").addEventListener("click", function() {
        switchView('clusters');
    });
    document.getElementById("nav-results").addEventListener("click", function() {
        switchView('results');
    });

    // Clear input fields for soft-refreshes
    document.getElementById("save-Company").value = "";
    document.getElementById("save-Project").value = "";
    document.getElementById("loadFile").value = "";

    // Prepare first cluster
    addCluster();

    // Create results table rows
    var table = document.getElementById("tableResults").getElementsByTagName("tbody")[0];
    var cells = {};
    var cellID = ["name", "qty", "terms", "cost", "subtotal"];
    var term;
    var termDefault = parseInt(Object.keys(license.terms).pop());
    var price,
        newRow,
        col,
        years;

    // Create vSphere rows
    for (var vSphere in license.vSphere) {
        newRow = table.insertRow(table.rows.length);
        newRow.id = "results-" + vSphere;
        newRow.style.display = "none";

        // Create cells
        for (col = 0; col < 5; col++) {
            cells[col] = newRow.insertCell(col);
            cells[col].id = vSphere + "-" + cellID[col];
        }

        // Dropdown for subscription term
        term = '<select class="form-select" aria-label="Term" id="' + vSphere + '-term">';
        for (years in license.terms) {
            term += '<option value="' + years + '"' + (parseInt(years) === termDefault ? " selected" : "") + '>' + license.terms[years] + '</option>';
        }
        term += '</select>';

        // Placeholder price
        price = listPrice[vSphere][termDefault].toLocaleString('en-US') || "";

        // Populate cell data
        cells[0].innerHTML = license.vSphere[vSphere];
        cells[2].innerHTML = term;
        cells[3].innerHTML = '<div class="input-group"><span class="input-group-text">$</span><input type="text" id="' + vSphere + '-price" placeholder="' + price + '" class="form-control" aria-label="Amount (to the nearest dollar)"></div>';

        // Add eventListeners for changes to results section
        document.getElementById(vSphere + "-term").addEventListener("input", function() {
            updateResults();
        });
        document.getElementById(vSphere + "-price").addEventListener("input", function() {
            updateResults();
        });
    }

    // Create vSAN rows
    for (var vSAN in license.vSAN) {
        newRow = table.insertRow(table.rows.length);
        newRow.id = "results-" + vSAN;
        newRow.style.display = "none";

        // Create cells
        for (col = 0; col < 5; col++) {
            cells[col] = newRow.insertCell(col);
            cells[col].id = vSAN + "-" + cellID[col];
        }

        // Dropdown for subscription term
        term = '<select class="form-select" aria-label="Term" id="' + vSAN + '-term">';
        for (years in license.terms) {
            term += '<option value="' + years + '"' + (parseInt(years) === termDefault ? " selected" : "") + '>' + license.terms[years] + '</option>';
        }
        term += '</select>';

        // Placeholder price
        price = listPrice[vSAN][termDefault].toLocaleString('en-US') || "";

        // Populate cell data
        cells[0].innerHTML = license.vSAN[vSAN];
        cells[2].innerHTML = term;
        cells[3].innerHTML = '<div class="input-group"><span class="input-group-text">$</span><input type="text" id="' + vSAN + '-price" placeholder="' + price + '" class="form-control" aria-label="Amount (to the nearest dollar)"></div>';

        // Add eventListeners for changes
        document.getElementById("vSAN-term").addEventListener("input", function() {
            updateResults();
        });
        document.getElementById("vSAN-price").addEventListener("input", function() {
            updateResults();
        });
    }
}

// Switch visible container
function switchView(container) {
    var elemClusters = document.getElementById("containerClusters");
    var elemResults = document.getElementById("containerResults");
    var navFullView = document.getElementById("nav-fullview");
    var navClusters = document.getElementById("nav-clusters");
    var navResults = document.getElementById("nav-results");
    // Clusters
    if (container === "clusters") {
        elemClusters.style.display = "";
        navClusters.classList.add("active");
    } else {
        elemClusters.style.display = "none";
        navClusters.classList.remove("active");
    }
    // Results
    if (container === "results") {
        elemResults.style.display = "";
        navResults.classList.add("active");
    } else {
        elemResults.style.display = "none";
        navResults.classList.remove("active");
    }
    // Full view
    if (container === "fullview") {
        elemClusters.style.display = "";
        elemResults.style.display = "";
        navFullView.classList.add("active");
    } else {
        navFullView.classList.remove("active");
    }
}

// Variables
var clusters = {},
    results = {},
    company = "",
    project = "";

// Add cluster
function addCluster(UUID) {
    // Function variables
    var clusterUUID = UUID || generateUUID();
    if (typeof UUID === "undefined") {
        clusters[clusterUUID] = {};
    }
    var table = document.getElementById("tableClusters").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.rows.length);
    var inputIDs = ["vcenter", "name", "hosts", "cpus", "cores", "vsan", "disks", "diskSize", "lic"];
    var cells = {};

    // Generate vSAN Disks select element
    var selectVsanDisks = '<select class="form-select" aria-label="vSAN capacity disks" id="' + clusterUUID + '-disks" disabled><option selected disabled></option>';
    for (var index = vSAN.minDisks; index <= vSAN.maxDisks; index++) {
        selectVsanDisks += '<option value="' + index + '">' + index + '</option>';
    }
    selectVsanDisks += '</select>';

    // Generate vSAN Disk Size select element
    var selectDiskSize = '<input class="form-control" list="datalistDiskSize" placeholder="" id="' + clusterUUID + '-diskSize" disabled><datalist id="datalistDiskSize">';
    for (var size of vSAN.diskSizes) {
        selectDiskSize += '<option value="' + size + '">';
    }
    selectDiskSize += '</datalist>';

    // Generate cluster license list
    var selectLicense = '<select class="form-select" aria-label="Cluster license" id="' + clusterUUID + '-lic"><option selected disabled value="">select</option>';
    for (var lic in license.vSphere) {
        selectLicense += '<option value="' + lic + '">' + license.vSphere[lic] + '</option>';
    }
    selectLicense += '</select>';

    // Prepare ten columns
    for (var col = 0; col < 10; col++) {
        cells[col] = newRow.insertCell(col);
    }

    // Add HTML to cell
    newRow.id = clusterUUID;
    cells[0].innerHTML = '<input class="form-control" type="text" placeholder="01" aria-label="vCenter" maxlength="80" id="' + clusterUUID + '-vcenter">';
    cells[1].innerHTML = '<input class="form-control" type="text" placeholder="vmw-' + clusterUUID.substring(0, 8) + '" aria-label="Cluster name" maxlength="80" id="' + clusterUUID + '-name">';
    cells[2].innerHTML = '<input type="text" class="form-control" placeholder="" aria-label="Host count" length="2" maxlength="2" id="' + clusterUUID + '-hosts">';
    cells[3].innerHTML = '<input type="text" inputmode="numeric" class="form-control" placeholder="" aria-label="CPUs/host" maxlength="1" id="' + clusterUUID + '-cpus">';
    cells[4].innerHTML = '<input type="text" inputmode="numeric" class="form-control" placeholder="" aria-label="Cores/CPU" maxlength="2" id="' + clusterUUID + '-cores">';
    cells[5].innerHTML = '<div class="form-check form-switch pt-1"><input style="height:1.25em;" class="form-check-input" type="checkbox" value="No" role="switch" id="' + clusterUUID + '-vsan" onclick="toggleVsan(\'' + clusterUUID + '\');">';
    cells[6].innerHTML = selectVsanDisks;
    cells[7].innerHTML = selectDiskSize;
    cells[8].innerHTML = selectLicense;
    cells[9].innerHTML = '<button id="btnDelete-' + clusterUUID + '" type="button" class="btn btn-danger btn-sm">X</button>';

    // Add eventListeners
    // Reject non-numeric input
    for (var field of ["hosts", "cpus", "cores"]) {
        document.getElementById(clusterUUID + "-" + field).addEventListener("input", function() {
            var test = this.value.replace(/[^0-9]/g, "");
            if (test !== this.value) {
                this.value= test;
            }
        });
    }
    // Save values onChange
    for (var input of inputIDs) {
        document.getElementById(clusterUUID + "-" + input).addEventListener("input", function() {
            onChange(clusterUUID);
        });
    }
    // Delete cluster button
    document.getElementById("btnDelete-" + clusterUUID).addEventListener("click", function() {
        delCluster(clusterUUID);
    });
}

// Delete cluster
function delCluster(id) {
    delete clusters[id];
    var elem = document.getElementById(id);
    elem.remove();
    updateResults();
}

// Toggle vSAN
function toggleVsan(id, disable) {
    var input = document.getElementById(id + "-vsan");
    var disks = document.getElementById(id + "-disks");
    var diskSize = document.getElementById(id + "-diskSize");
    var lic = document.getElementById(id + "-lic");

    // Toggle input value
    if (input.value === "No" && !disable) {
        input.value = "Yes";
        disks.removeAttribute("disabled");
        diskSize.removeAttribute("disabled");
        // Switch to minimum vSphere license
        if (lic.value === "VVEP" || lic.value === "VVS") {
            lic.value = "VVF";
        }
    } else {
        input.value = "No";
        disks.value = "";
        disks.setAttribute("disabled", "");
        diskSize.value ="";
        diskSize.setAttribute("disabled", "");
    }
}

// Save values when input field is modified
function onChange(id) {
    // Save input values to object
    clusters[id].name = document.getElementById(id + "-name").value || document.getElementById(id + "-name").placeholder || "";
    clusters[id].vcenter = document.getElementById(id + "-vcenter").value || document.getElementById(id + "-vcenter").placeholder || "";
    clusters[id].hosts = parseInt(document.getElementById(id + "-hosts").value) || 0;
    clusters[id].cpus = parseInt(document.getElementById(id + "-cpus").value) || 0;
    clusters[id].cores = parseInt(document.getElementById(id + "-cores").value) || 0;
    clusters[id].lic = document.getElementById(id + "-lic").value || "";
    clusters[id].vsan = document.getElementById(id + "-vsan").value || "";
    clusters[id].disks = parseInt(document.getElementById(id + "-disks").value) || 0;
    clusters[id].diskSize = document.getElementById(id + "-diskSize").value || "";

    // Disable vSAN if minimum license not chosen
    if (clusters[id].vsan === "Yes" && (clusters[id].lic === "VVEP" || clusters[id].lic === "VVS")) {
        clusters[id].vsan = "No";
        document.getElementById(id + "-vsan").click();
        toggleVsan(id, true);
    }

    // Check VMware vSphere Essentials Plus minimmums
    if (clusters[id].lic === "VVEP") {
        if (clusters[id].hosts > 3 || (clusters[id].hosts * clusters[id].cpus * clusters[id].cores) > 96) {
            document.getElementById(id + "-lic").value = "VVS";
            clusters[id].lic = "VVS";
        }
    }

    // Update results table
    updateResults();
}

function updateResults() {
    var licenses = {};
    var lic,
        hosts,
        cpus,
        cores,
        vsan,
        disks,
        diskSize,
        vcenter,
        term,
        cost,
        subtotal,
        vSANcapacity,
        vSANembedded;
    var vCenters = {};
    var total = 0;

    // Build object of vCenter Servers
    for (var i in clusters) {
        var vcenterID = clusters[i].vcenter;
        if (typeof vCenters[vcenterID] !== "object") {
            vCenters[vcenterID] = {
                VCFvSANembedded: 0,
                VCFvSANrequired: 0,
            };
        }
    }

    // Calculate values
    for (var cluster in clusters) {
        vSANcapacity = 0;
        vSANembedded = 0;
        vcenter = clusters[cluster].vcenter;
        lic = clusters[cluster].lic;
        hosts = clusters[cluster].hosts || 0;
        cpus = clusters[cluster].cpus || 0;
        cores = clusters[cluster].cores || 0;
        vsan = clusters[cluster].vsan || "No";
        disks = clusters[cluster].disks || 0;
        // Disk size: [label, capacity, unit]
        diskSize = (typeof clusters[cluster].diskSize !== "undefined" ? clusters[cluster].diskSize.match(/(\d+\.?\d*) *([A-Za-z][Bb])/) : [0, 0, "TB"]);
        
        // vSphere
        if (typeof lic !== "undefined" && lic !== "") {
            // If NaN, set to zero
            if (typeof licenses[lic] !== "number") {
                licenses[lic] = 0;
            }
            licenses[lic] += hosts * cpus * Math.max(license.minCores, cores);
        }

        // vSAN
        // Calculate available vSAN licensing from cores
        if (typeof vSAN.embeddedTiB[lic] !== "undefined") {
            // If VCF, add the vSAN capacity/core to the aggregate
            if (lic === "VCF") {
                vCenters[vcenter].VCFvSANembedded += hosts * cpus * Math.max(license.minCores, cores) * vSAN.embeddedTiB[lic];
            } else if (lic === "VVF") {
                // If VVF, the vSAN capacity/core is only local to the custer
                vSANembedded = hosts * cpus * Math.max(license.minCores, cores) * vSAN.embeddedTiB[lic];
            }
        }
        // Calculate cluster vSAN raw capacity
        if (typeof licenses.vSAN === "undefined") {
            licenses.vSAN = 0;
        }
        if (vsan === "Yes") {
            // Convert GB to TB
            if (diskSize !== null && diskSize[2] === "GB") {
                diskSize[1] = parseFloat(diskSize[1]) / 1000;
                diskSize[2] = "TB";
            }
            if (diskSize !== null && typeof diskSize[1] !== "undefined") {
                vSANcapacity = convertTBtoTiB(hosts * disks * diskSize[1]);
            }
            // If VCF, calculate the required capacity and add to aggregate of the vCenter
            if (lic === "VCF") {
                vCenters[vcenter].VCFvSANrequired += vSANcapacity;
            } else {
                if (lic === "VVF" && vSANcapacity < vSANembedded) {
                    // Do nothing; embedded vSAN licenses cover required capacity for this cluster
                } else {
                    licenses.vSAN += Math.ceil(vSANcapacity);
                }
            }
        }
    }
    // Calculate the aggregate delta in capacity for vCenters with VCF
    for (var v in vCenters) {
        licenses.vSAN += Math.max(Math.ceil(vCenters[v].VCFvSANrequired - vCenters[v].VCFvSANembedded), 0);
    }

    // Update values
    for (var option in licenses) {
        term = parseInt(document.getElementById(option + "-term").value);
        document.getElementById(option + "-price").placeholder = listPrice[option][term] || "";
        cost = parseInt(document.getElementById(option + "-price").value.replace(",", "")) || parseInt(document.getElementById(option + "-price").placeholder.replace(",", "")) || 0;
        subtotal = cost * licenses[option];
        total += subtotal;
        document.getElementById(option + "-qty").innerHTML = licenses[option].toLocaleString('en-US');
        document.getElementById(option + "-subtotal").innerHTML = "$ " + subtotal.toLocaleString('en-US');
    }
    document.getElementById("results-Total").innerHTML = "$ " + total.toLocaleString('en-US');

    // Show/hide rows
    var table = document.getElementById("tableResults").getElementsByTagName("tbody")[0];
    var rows = table.getElementsByTagName("tr");
    var totalRow = document.getElementById("tableResults").getElementsByTagName("tfoot")[0];
    var id,
        row;
    var visible = 0;
    for (var r = 0; r < rows.length; r++) {
        id = rows[r].id.replace("results-", "");
        // Save values to global object
        results[id] = {
            term: parseInt(document.getElementById(id + "-term").value || 3),
            price: parseInt(document.getElementById(id + "-price").value) || false
        };
        row = document.getElementById(rows[r].id);
        if (typeof licenses[id] !== "undefined" && licenses[id] > 0) {
            row.style.display = "";
            visible++;
        } else {
            row.style.display = "none";
        }
    }
    // Show Total row if at least one visible table row
    if (visible > 0) {
        totalRow.style.display = "";
    } else {
        totalRow.style.display = "none";
    }
}

// Save configuration to file
var save = {
    toFile: function() {
        company = document.getElementById("save-Company").value;
        project = document.getElementById("save-Project").value;
        var date = new Date().toISOString().split("T")[0];

        // Remove unsupported characters for filename
        var clean = function(text) {
            return text.replace(/[^\w.-]/g, '-');
        };

        var filename = clean((company || "noname") + "_VMW_" + (project || "untitled") + "_" + date) + ".json";
        var data = {
            file: {
                company: company,
                project: project,
                version: version
            },
            clusters: { ...clusters},
            results: { ...results}
        };
        var json = JSON.stringify(data);

        // Create file
        var file = new Blob([json], {type: "application/json"});
        if (window.navigator.msSaveOrOPenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            var a = document.createElement("a");
            var url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }

        // Close modal
        try {
            var modalElement = document.getElementById('modalSave');
            var modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        } catch (err) {
            // Do nothing
        }
    }
};

// Load saved configuration
var load = {
    fromFile: function() {
        if (typeof window.FileReader !== "function") {
            alert("The file API is not supported with this browser.");
        } else {
            var fileInput = document.getElementById("loadFile");
            var btnLoadFile = document.getElementById("btnLoadFile");
            if (!fileInput) {
                alert("Could not find the file input element");
            } else if (fileInput === null || typeof fileInput.files === "undefined" || fileInput.value === null) {
                alert("This browser does not support file inputs");
            } else if (fileInput.value === "") {
                alert("Invalid configuration file.");
            } else {
                var file = fileInput.files[fileInput.files.length - 1];
                var reader = new FileReader;
                reader.onload = function() {
                    var fileContents = reader.result;
                    var loaded = JSON.parse(fileContents);
                    clearData();

                    // Load contents into global variables
                    var config = loaded.file || {};
                    clusters = loaded.clusters || {};
                    results = loaded.results || {};

                    // Import Company and Projectnames
                    document.getElementById("save-Company").value = config.company || "";
                    document.getElementById("save-Project").value = config.project || "";

                    // Upload Term and Price values to Results fields
                    for (var lic in results) {
                        var term = results[lic].term;
                        var price = results[lic].price;
                        document.getElementById(lic + "-term").value = (term === 1 ? 1 : 3);
                        document.getElementById(lic + "-price").value = (price ? price : "");
                    }

                    // Fill data into tables
                    var temp;
                    for (var i in clusters) {
                        // Save object to temp variable to avoid vSAN.click overwriting value
                        temp = JSON.parse(JSON.stringify(clusters[i]));
                        // Add cluster row
                        addCluster(i);
                        // Populate cluster row fields
                        document.getElementById(i + "-vcenter").value = temp.vcenter;
                        document.getElementById(i + "-name").value = temp.name;
                        document.getElementById(i + "-hosts").value = temp.hosts;
                        document.getElementById(i + "-cpus").value = temp.cpus;
                        document.getElementById(i + "-cores").value = temp.cores;
                        document.getElementById(i + "-lic").value = temp.lic;
                        if (temp.vsan === "Yes") {
                            document.getElementById(i + "-vsan").click();
                            document.getElementById(i + "-disks").removeAttribute("disabled");
                            document.getElementById(i + "-diskSize").removeAttribute("disabled");
                            document.getElementById(i + "-vsan").value = temp.vsan;
                            document.getElementById(i + "-disks").value = temp.disks;
                            document.getElementById(i + "-diskSize").value = temp.diskSize;
                        }
                        // Force save the temp object back to global clusters object, ensuring correct values
                        clusters[i] = JSON.parse(JSON.stringify(temp));
                    }

                    // Clear file upload
                    fileInput.value = "";
                    // Disable Load button
                    btnLoadFile.setAttribute("disabled", "");
                    btnLoadFile.classList.remove("btn-primary");
                    btnLoadFile.classList.add("btn-outline-secondary");
                };
                reader.readAsText(file);
            }

            // Close modal
            try {
                var offcanvasElement = document.getElementById('offcanvasLoad');
                var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                offcanvas.hide();
            } catch (err) {
                // Do nothing
            }
        }
    }
};

// Clear all data
function clearData() {
    for (var i in clusters) {
        delCluster(i);
    }
}

// Generate UUID
// From Briguy37 at https://stackoverflow.com/a/8809472
function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Convert capacity units
function convertTBtoTiB(terabytes) {
    if (typeof terabytes !== "number") {
        terabytes = 0;
    }
    var bytes = terabytes * Math.pow(10, 12);
    var tebibytes = bytes / Math.pow(1024, 4);
    return parseFloat(tebibytes.toFixed(2));
}

// Add eventListeners
// Toggle theme button
document.getElementById("bd-theme").addEventListener("click", ()=> {
    toggleTheme();
});
// Add cluster
document.getElementById("btnAddCluster").addEventListener("click", ()=> {
    addCluster();
});
// Save configuration to file
document.getElementById("btnSaveProject").addEventListener("click", ()=> {
    save.toFile();
});
// On-change of upload file field
document.getElementById("loadFile").addEventListener("change", function() {
    var file = document.getElementById("loadFile").value;
    var btnLoadFile = document.getElementById("btnLoadFile");
    if (file !== "" && /\.json$/.test(file)) {
        // Enable Load button
        btnLoadFile.classList.remove("btn-outline-secondary");
        btnLoadFile.classList.add("btn-primary");
        btnLoadFile.removeAttribute("disabled");
    } else {
        // Disable Load button
        btnLoadFile.setAttribute("disabled", "");
        btnLoadFile.classList.remove("btn-primary");
        btnLoadFile.classList.add("btn-outline-secondary");
    }
});
// Load file
document.getElementById("btnLoadFile").addEventListener("click", ()=> {
    load.fromFile();
});