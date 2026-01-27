output "instance_public_ip" {
  description = "The public IP address of the EC2 instance (Elastic IP)"
  value       = aws_eip.library_eip.public_ip
}

output "elastic_ip" {
  description = "The Elastic IP address"
  value       = aws_eip.library_eip.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.library_server.public_dns
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.library_vpc.id
}

output "security_group_id" {
  description = "ID of the security group"
  value       = aws_security_group.library_sg.id
}