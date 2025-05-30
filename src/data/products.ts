
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Cisco Catalyst 3750X Switch',
    category: 'switch',
    price: 899.99,
    condition: 'excellent',
    description: 'Enterprise-grade 48-port Gigabit switch with 4 SFP uplinks. Fully tested and verified, includes rack mounting hardware.',
    specifications: [
      '48 x 10/100/1000 Ethernet ports',
      '4 x SFP uplink interfaces',
      'StackWise technology',
      'Layer 3 routing capabilities',
      'IPv6 support',
      'Power consumption: 190W'
    ],
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 5
  },
  {
    id: 2,
    name: 'Juniper SRX340 Firewall',
    category: 'firewall',
    price: 1299.99,
    condition: 'like-new',
    description: 'High-performance security appliance for midsize networks. Provides advanced security services including application security, unified threat management (UTM), and next-generation firewall capabilities.',
    specifications: [
      'Up to 5 Gbps firewall throughput',
      '8 x 1GbE ports',
      '300,000 concurrent sessions',
      'IPsec VPN, SSL VPN',
      'Intrusion Prevention System (IPS)',
      'Application identification'
    ],
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/1770808/pexels-photo-1770808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 3
  },
  {
    id: 3,
    name: 'Dell PowerEdge R730 Server',
    category: 'server',
    price: 1899.99,
    condition: 'good',
    description: 'Versatile 2U rack server with dual Intel Xeon processors, ideal for virtualization and business-critical applications. Includes rails and bezel.',
    specifications: [
      'Dual Intel Xeon E5-2680 v4 processors (14 cores each)',
      '128GB DDR4 RAM',
      '6x 900GB 10K SAS drives in RAID 5',
      'Redundant power supplies',
      'iDRAC8 Enterprise remote management',
      'Broadcom 5720 Quad Port 1GbE network adapter'
    ],
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 2
  },
  {
    id: 4,
    name: 'Cisco 4321 ISR Router',
    category: 'router',
    price: 749.99,
    condition: 'excellent',
    description: 'Integrated Services Router for branch offices. Provides secure WAN connectivity and integrated threat control.',
    specifications: [
      'Up to 50 Mbps throughput with services',
      '3 x GE interfaces',
      '2 x NIM slots',
      'Software upgradable license',
      'Quality of Service (QoS)',
      'Supports Voice over IP (VoIP)'
    ],
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 7
  },
  {
    id: 5,
    name: 'Ubiquiti EdgeRouter 4',
    category: 'router',
    price: 199.99,
    condition: 'like-new',
    description: 'Compact yet powerful router with advanced routing features including OSPF, BGP, and policy-based routing. Perfect for small business networks.',
    specifications: [
      '4 x Gigabit RJ45 ports',
      '1 x SFP port',
      'Dual-core CPU',
      '1 million packets per second routing',
      'EdgeOS web interface',
      'CLI configuration'
    ],
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 12
  },
  {
    id: 6,
    name: 'HP Aruba 2930F Switch',
    category: 'switch',
    price: 649.99,
    condition: 'good',
    description: 'Layer 3 Ethernet switch with 24 Gigabit ports and 4 SFP+ uplinks. Managed switch with advanced security and traffic management features.',
    specifications: [
      '24 x 10/100/1000 Ethernet ports',
      '4 x SFP+ 10G uplinks',
      'Static, RIP, and access OSPF routing',
      'Zero-Touch Provisioning',
      'Energy-efficient design',
      'Limited lifetime warranty'
    ],
    verified: false,
    imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 4
  },
  {
    id: 7,
    name: 'FortiGate 100F Firewall',
    category: 'firewall',
    price: 1599.99,
    condition: 'fair',
    description: 'Next-generation firewall with advanced threat protection and SD-WAN capabilities. Ideal for medium-sized businesses and branch offices.',
    specifications: [
      'Up to 10 Gbps firewall throughput',
      '10 x 1GbE RJ45 ports',
      '2 x 1GbE SFP slots',
      'FortiOS 6.4 operating system',
      'SSL inspection, IPS, application control',
      'VPN throughput: 4.4 Gbps'
    ],
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 1
  },
  {
    id: 8,
    name: 'HPE ProLiant DL380 Gen10 Server',
    category: 'server',
    price: 2499.99,
    condition: 'excellent',
    description: 'Industry-leading 2U rack server designed for multi-workload computing. Perfect for virtualization, database, and high-performance applications.',
    specifications: [
      'Intel Xeon Silver 4210 (10 cores)',
      '64GB DDR4 RAM',
      '4 x 1.2TB SAS 10K drives',
      'HPE Smart Array P408i-a controller',
      'Redundant hot-plug power supplies',
      'iLO 5 Advanced remote management'
    ],
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 2
  }
];

