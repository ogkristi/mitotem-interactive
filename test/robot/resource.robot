*** Settings ***
Library     OperatingSystem
Library     SeleniumLibrary
Library     ./TestLib.py


*** Variables ***
${BROWSER}      firefox
${INPUT_DIR}    %{PWD}/test/robot/input
${URL}          localhost:5173
${DELAY}        0.1 seconds


*** Keywords ***
Open And Configure Browser
    Open Browser    ${URL}    ${BROWSER}
    Set Selenium Speed    ${DELAY}

Remove Test Images
    Remove File    %{UPLOAD_FOLDER}/test_*
