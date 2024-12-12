# upload image to s3 bucket (upload-ingredients route)
# pull from s3 (might not beed to pull image from s3)
# run image through detr-restnet-50 computer vision model
# add detected objects with confidence > 0.9 to array
# pass array to InstaFood named entity recognition model to extract only foods
# this becomes the ingredients that are passed to generate-recipe endpoint
