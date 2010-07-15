require 'rubygems'
require 'nokogiri'

$fetch_day_url = %{https://itxmail01/owa/?ae=Folder&t=IPF.Appointment&yr=%s&mn=%s&dy=%s}
$login_url = %{https://itxmail01/owa/auth/logon.aspx}

