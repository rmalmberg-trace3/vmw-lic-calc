Online tool available at https://rmalmberg-trace3.github.io/vmw-lic-calc/.

- Enter the host count, CPUs/host, cores/CPU, and then choose a vSphere license level.
- Optionally enable vSAN and select the number of capacity disks and capacity disk size.
  - Pre-filled disk sizes are available, else enter a custom disk size.
- vSAN capacity add-on license will not be displayed if none is required.
- Changing a cluster's license to an option that does not support vSAN will disable vSAN for the cluster.
- Enabling vSAN on a cluster that does not have a selected license that supports the vSAN feature will automatically select the minimum vSphere license required for that cluster.
- If a cluster with the vSphere Essentials Plus license selected exceeds the limitation on the number of hosts or total cores, the tool will automatically increase the license to the minimum required license (VMware vSphere Standard).
