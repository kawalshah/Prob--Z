// import res from 'express/lib/response';
import ip from 'ip';
// import ipInfo from 'ip-info-finder';
import ip6 from 'ip6';
import i2i from 'ip-to-int';
function getclass(ip) {
    if (ip >= 1 && ip <= 126)
      return 'A';
    else if (ip >= 128 && ip <= 191)
      return 'B';
    else if (ip >= 192 && ip <= 223)
      return 'C';
    else if (ip >= 224 && ip <= 239)
      return 'D';
    else
      return 'E';
}
function getwild(subnets){
    let wildcard=[];
    for (let i in subnets) {
      let ss=255;
      wildcard[i] = ss^subnets[i];
    }
    return wildcard;
}

function ipdetails(example,subnetx){
  if(!is4(example) || !is4(subnetx))return "Invaild Ip address";

  const ipadr_spl = example.split('.').map(Number);
  const subnet_spl =subnetx.split('.').map(Number);
  var details={
      ipadr: example,
      sub:ip.subnet(example,subnetx).subnetMaskLength,
      mask:subnetx,
      network:ip.subnet(example,subnetx).networkAddress,
      broadcast:ip.subnet(example,subnetx).broadcastAddress,
      no_of_host:ip.subnet(example,subnetx).length,
      valid_host:ip.subnet(example,subnetx).numHosts,
      class:getclass(ipadr_spl[0]),
      wild:getwild(subnet_spl)
  }
  // console.log(details);
  return details;
}

function compress(addr){
  if(!is6(addr))return "Invaild Ip address";
  // console.log("hi");
  return ip6.abbreviate(addr);
}
function expand(addr){
  if(!is6(addr))return "Invaild Ip address";
  console.log(addr);
  return ip6.normalize(addr);
}

function hostdetails(addr){
  if(!is4(addr))return "Invaild Ip address";
  ipInfo.getIPInfo(addr).then(data => {
    console.log(data);
       return data;
  }).catch(err => console.log(err));
}



function iptodec(addr){
  if(!is4(addr))return "Invaild Ip address";
  return i2i(addr).toInt();
}

function equalip(a,b){
  if(!is6(a) || !is6(b))return "Invaild Ip address";
  // ip.isEqual('::1', '::0:1'); // true
  var x= ip.isEqual(a,b); // true
  // console.log(x);
  return x;
}
function tofull(mask){
  // ip.fromPrefixLen(24); // 255.255.255.0
  return ip.fromPrefixLen(mask); 
}
function is4(a){
  // ip.isV4Format('127.0.0.1'); // true
  var x= ip.isV4Format(a);
  return x;
}
function is6(a){
  var x= ip.isV6Format(a);
  console.log(x);
  console.log(a);
  return x;
  // ip.isV6Format('::ffff:127.0.0.1'); // true
}


export default ipdetails;
export {ipdetails,compress,expand,hostdetails,iptodec,is4,is6,equalip};





