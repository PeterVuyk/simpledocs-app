#!/bin/bash

printf "The assets in the assets-directory is taken over by the customer specific directories, with help of this script you can copy the customer assets into the public assets directory \n\n"
echo "Please provide the customer to copy the assets (Options: academie-voor-ambulancezorg | default):"
read customer

# Validate that the provided customer is set:
if [ -z "$customer" ]; then
  echo "No customer provided, set assets stopped."
  exit 1;
fi

# List of customers:
declare -a customers=(
  "academie-voor-ambulancezorg"
  "default"
)

# Validate that the provided value is an existing customer:
match=0
for availableCustomer in "${customers[@]}"; do
    if [[ $availableCustomer = "$customer" ]]; then
        match=1
        break
    fi
done
if [[ $match = 0 ]]; then
    echo "The provided customer '$customer' does not exist, set assets stopped."
fi

# Validate that the 'assets' directory and the 'customer-assets/<customer>' directory exists:
projectDirectory="$(dirname $(dirname $(realpath $0)) )"
echo $assetsDirectory;
if [ ! -d "${projectDirectory}/assets" ] || [ ! -d "${projectDirectory}/customer-assets/${customer}" ]; then
  echo "The assets directory or the customer assets directory does not exists"
fi

cp -r "$projectDirectory/customer-assets/${customer}/." "$projectDirectory/assets"
