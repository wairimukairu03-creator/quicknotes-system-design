# Infrastructure Design Scheme & Topography

### Traffic Estimations for 1 Million Users

- **Active Users Context:** Assuming 10% of users write notes daily (100,000 active posters).
- **Writes Per Second (WPS):** 100,000 requests spread over a peak window of 4 hours (14,400 seconds) ≈ **7 Writes/Second**.
- **Reads Per Second (RPS):** Assuming users review notes 5 times more frequently than they write them ≈ **35 Reads/Second**.
- **Annual Storage Capacity Scaling:** 100,000 notes written daily _ 1KB average string packet footprint _ 365 days = **36.5 GB storage growth per year**.

---

### Explicit Network Flow Step Mapping

#### 1. Fetch Request Execution Flow (GET)

1. **DNS Lookup:** Browser matches hostname coordinates through localized ISP servers.
2. **CDN Gateway:** Request hits Edge Cloudflare servers to extract cache assets instantly.
3. **Load Balancer (NGINX):** Incoming requests travel across available application instances using round-robin flow algorithms.
4. **Application Node Worker Queues:** Node workers dispatch tasks to complete queries without locking standard execution workflows.
5. **Read Replicas:** Select actions access secondary relational read nodes to fetch active note indexes while keeping traffic off primary database storage layers.

#### 2. Submission Post Pipeline (POST)

1. **Client Submission:** Form triggers a payload check and serializes user note fields into JSON blocks.
2. **CDN & Firewall Validation:** Request is authorized at reverse proxies.
3. **Application Routing Node:** Server extracts attributes and ensures structural compliance constraints are met.
4. **Primary Database Storage Cluster:** Session opens transactional writes on primary database layers.
5. **Replication Event:** Master updates sync changes downstream to read replicas instantly.
