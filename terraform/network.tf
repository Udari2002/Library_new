# Data source for latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# VPC
resource "aws_vpc" "library_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name    = "${var.project_name}-vpc"
    Project = var.project_name
  }
}

# Internet Gateway
resource "aws_internet_gateway" "library_igw" {
  vpc_id = aws_vpc.library_vpc.id

  tags = {
    Name    = "${var.project_name}-igw"
    Project = var.project_name
  }
}

# Public Subnet
resource "aws_subnet" "library_subnet" {
  vpc_id                  = aws_vpc.library_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name    = "${var.project_name}-subnet"
    Project = var.project_name
  }
}

# Get available AZs
data "aws_availability_zones" "available" {
  state = "available"
}

# Route Table
resource "aws_route_table" "library_rt" {
  vpc_id = aws_vpc.library_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.library_igw.id
  }

  tags = {
    Name    = "${var.project_name}-rt"
    Project = var.project_name
  }
}

# Route Table Association
resource "aws_route_table_association" "library_rta" {
  subnet_id      = aws_subnet.library_subnet.id
  route_table_id = aws_route_table.library_rt.id
}